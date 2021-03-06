using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Server.Models;

namespace Server.Controllers
{

    public abstract class Api<Entity> : Controller where Entity : class, INavigateId
    {
        private TicketDB repo;
        public Api(TicketDB repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public virtual IEnumerable<Entity> Get()
        {
            repo.Set<Entity>().Load();
            return repo.Set<Entity>();
        }

        [HttpGet("{id}")]
        public virtual IQueryable<Entity> Get(int Id) => repo.Set<Entity>().Where(q => q.Id == Id);



        [HttpPost]
        public virtual Entity Post([FromBody]Entity type)
        {
            if (type == null) return default;

            type.Id = 0;

            repo.Add(type);
            try
            {
                repo.SaveChanges();
            }
            catch
            {
                System.Console.WriteLine("wrong");
            }

            return type;


        }

        [HttpDelete("{id}")]
        public virtual void Delete(int Id)
        {
            var t = repo.Set<Entity>().FirstOrDefault(q => q.Id == Id);
            if (t == null) return;

            repo.Remove(t);
            repo.SaveChanges();
        }

        [HttpPut]
        public virtual void Update([FromBody]Entity type)
        {

            if (type == null) return;

            var qw = repo.Set<Entity>().FirstOrDefault(q => q.Id == type.Id);
            if (qw == null) return;
            repo.Entry<Entity>(qw).CurrentValues.SetValues(type);

            repo.SaveChanges();
        }

    }


    [Route("api/[controller]")]
    public class RoutesController : Api<Route>
    {
        public RoutesController(TicketDB repo) : base(repo)
        {
        }

    }

    [Route("api/[controller]")]
    public class BusTypesController : Api<BusType>
    {
        public BusTypesController(TicketDB repo) : base(repo)
        {
        }

    }

    [Route("api/[controller]")]
    public class BusesController : Api<Bus>
    {
        public BusesController(TicketDB repo) : base(repo)
        {
        }

    }

    [Route("api/[controller]")]
    public class BusDriversController : Api<BusDriver>
    {
        public BusDriversController(TicketDB repo) : base(repo)
        {
        }

    }

    [Route("api/[controller]")]
    public class TripsController : Api<Trip>
    {
        public TripsController(TicketDB repo) : base(repo)
        {
        }

    }

    [Route("api/[controller]")]
    public class UsersController : Api<User>
    {
        public UsersController(TicketDB repo) : base(repo)
        {
        }

    }

    [Route("api/[controller]")]
    public class TicketsController : Api<Ticket>
    {
        public TicketsController(TicketDB repo) : base(repo)
        {
        }

    }



    [Route("api/[controller]")]
    public class FindTrip : Controller
    {
        private TicketDB repo;
        public FindTrip(TicketDB repo)
        {
            this.repo = repo;
        }


        [HttpGet]
        public IActionResult Get(FindTripQuery query)
        {
            if (query.Start == null && query.Date == default && query.End == default) return BadRequest();

            var list = repo.Trips.Join(repo.Routes, e => e.RouteId, w => w.Id, (d, s) =>
                new TripQuery
                {
                    Id = d.Id,
                    Date = d.Date,
                    EndPoint = s.EndPoint,
                    StartPoint = s.StartPoint,
                    Seats = d.Bus.BusType.Seats - repo.Tickets.Count(w => w.TripId == d.Id)
                }).Where(w =>
                (query.Start == null ||
                String.Equals(query.Start, w.StartPoint, StringComparison.CurrentCultureIgnoreCase))
                && (query.End == null || String.Equals(query.End, w.EndPoint, StringComparison.CurrentCultureIgnoreCase))
                    && (query.Date == default || w.Date.CompareTo(query.Date) == 0));


            if (!list.Any()) return BadRequest();
            return Ok(list);
        }


    }

    [Route("api/[controller]")]
    public class AllTrips : Controller
    {
        private TicketDB repo;
        public AllTrips(TicketDB repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public IQueryable<TripQuery> Get()
        {
            if (!ModelState.IsValid) return null;

            var list = repo.Trips.Join(repo.Routes, e => e.RouteId, w => w.Id, (d, s) =>
                   new TripQuery
                   {
                       Id = d.Id,
                       Date = d.Date,
                       EndPoint = s.EndPoint,
                       StartPoint = s.StartPoint,
                       Seats = d.Bus.BusType.Seats - repo.Tickets.Count(w => w.TripId == d.Id)
                   });

            if (list.Count() == 0) return null;
            return list;
        }



    }

    [Route("api/[controller]")]
    public class GetSession : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            var w = HttpContext.Session.GetJson<User>("user");
            if( w != null)
            {
                return Ok(w);
            }
            return BadRequest();
        }

    }

    [Route("api/[controller]")]
    public class Login : Controller
    {
        private TicketDB repo;
        public Login(TicketDB repo)
        {
            this.repo = repo;
        }

        [HttpPost]
        public IActionResult Post([FromBody]Credintals cred)
        {
            if (!ModelState.IsValid) return BadRequest();

            var User = repo.Users.FirstOrDefault(w => w.Email == cred.Email && w.Password == cred.Pass);

            if (User != null)
            {
                HttpContext.Session.SetJson("user", User);
                CookieBuilder f = new CookieBuilder();
                f.HttpOnly =false;
                f.SameSite = SameSiteMode.None;
                f.SecurePolicy = CookieSecurePolicy.None;
               
                

                HttpContext.Response.Cookies.Append("asd","asdasd",f.Build(this.HttpContext));
                return Ok(User);
            }

            return BadRequest("Neverno");
        }

        [HttpGet]
        public IActionResult Get(Credintals cred)
        {
            if (!ModelState.IsValid) return BadRequest();

            var User = repo.Users.FirstOrDefault(w => w.Email == cred.Email && w.Password == cred.Pass);

            if (User != null)
            {
                HttpContext.Session.SetJson("user", User);
                return Ok(User);
            }

            return BadRequest("Neverno");
        }
    }

    [Route("api/[controller]")]
    public class Logoff : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            HttpContext.Session.SetJson("user", null);
            return Ok();
        }
    }




    public static class SessionExtension
    {
        public static void SetJson(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }
        public static T GetJson<T>(this ISession session, string key)
        {
            var sessionData = session.GetString(key);
            return sessionData == null ? default(T) : JsonConvert.DeserializeObject<T>(sessionData);
        }

    }

    [Route("api/[controller]")]
    public class Registration : Controller
    {
        private TicketDB repo;
        public Registration(TicketDB repo)
        {
            this.repo = repo;
        }
        [HttpPost]
        public IActionResult Post([FromBody]User cred)
        {
            if (!ModelState.IsValid) return BadRequest("Model invalid");

            cred.UserRoleId = 0;
            cred.Id = 0;

            cred.UserRole = repo.UserRoles.FirstOrDefault(w => w.Type == "user");
            if (repo.Users.Any(w => w.Email == cred.Email)) return BadRequest($"Email: {cred.Email} exists");

            repo.Users.Add(cred);
            repo.SaveChanges();

            return Ok(cred);
        }
    }

    [Route("api/[controller]")]
    public class Schedule : Controller
    {
        private TicketDB repo;
        public Schedule(TicketDB repo)
        {
            this.repo = repo;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {

            var result = repo.BusDrivers.Where(w => w.UserId == id)
            .Join(repo.Trips, q => q.BusId, e => e.BusId, (q, e) =>
                 new
                 {
                     Id = e.Id,
                     StartPoint = e.Route.StartPoint,
                     EndPoint = e.Route.EndPoint,
                     Date = e.Date,
                     BusType = e.Bus.BusType.Type
                 }).OrderByDescending(w => w.Date);

            if (result == null || !result.Any())
                return BadRequest();

            return Ok(result);

        }
    }


    [Route("api/[controller]")]
    public class Booking : Controller
    {
        private TicketDB repo;
        public Booking(TicketDB repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public IQueryable<Ticket> Get()
        {
            return repo.Tickets;
        }

        [HttpGet("{id}")]
        public IQueryable<TripQuery> Get(int id)
        {
            var w = repo.Tickets.Where(r => r.UserId == id).Join(repo.Trips, t => t.TripId, q => q.Id, (a, b) =>
                         new TripQuery
                         {
                             Id = a.Id,
                             Date = b.Date,
                             EndPoint = b.Route.EndPoint,
                             StartPoint = b.Route.StartPoint
                         });


            return w;
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var ticket = repo.Tickets.FirstOrDefault(w => w.Id == id);
            if (ticket == null) return;
            repo.Remove(ticket);
            repo.SaveChanges();
        }

        [HttpPost]
        public Ticket Post([FromBody]BookingQuery query)
        {
            if (!ModelState.IsValid) return null;

            if (query.UserId == 0 || query.TripId == 0) return null;

            if (!(repo.Users.Any(w => w.Id == query.UserId) && repo.Trips.Any(w => w.Id == query.TripId)))
                return null;


            repo.Trips.Include(w => w.Bus);
            repo.Buses.Load();
            repo.BusTypes.Load();
            var trip = repo.Trips.FirstOrDefault(w => w.Id == query.TripId);

            if (repo.Tickets.Where(w => w.TripId == query.TripId).Count() >= trip.Bus.BusType.Seats)
                return null;


            Ticket ticket = new Ticket
            {
                Trip = trip,
                UserId = query.UserId

            };

            repo.Tickets.Add(ticket);

            repo.SaveChanges();

            return ticket;

        }
    }



}