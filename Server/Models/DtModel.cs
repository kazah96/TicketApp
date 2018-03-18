using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Server.Models
{
    public class TicketDB : DbContext
    {
        public DbSet<BusType> BusTypes { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Route> Routes { get; set; }
        public DbSet<BusDriver> BusDrivers { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder opdb)
        {
            opdb.UseSqlite($"Data Source = Tickets.db");
        }

    }

    public interface INavigateId
    {
        int Id { get; set; }
    }

    public class Credintals
    {
        public string Email { get; set; }
        public string Pass { get; set; }
    }
    public class BusType : INavigateId
    {

        public int Id { get; set; }
        public string Type { get; set; }
        public int Seats { get; set; }
    }

    public class Bus : INavigateId
    {
        public int Id { get; set; }
        public int BusTypeId { get; set; }
        [JsonIgnore]
        public BusType BusType { get; set; }
        public string Number { get; set; }
    }

    public class Route : INavigateId
    {
        public int Id { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }

    }

    public class UserRole : INavigateId
    {
        public int Id { get; set; }
        [Required]
        public string Type { get; set; }

    }


    public class BusDriver : INavigateId
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        [Required]
        public int BusId { get; set; }
        [JsonIgnore]
        public Bus Bus { get; set; }

    }

    public class Ticket : INavigateId
    {
        public int Id { get; set; }
        public int TripId { get; set; }
        [JsonIgnore]
        public Trip Trip { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }

    public class User : INavigateId
    {
        public int Id { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }

        public string Surname { get; set; }
        [Required]
        public string Phone { get; set; }
        [Required]
        public string Email { get; set; }
        [JsonIgnore]
        public UserRole UserRole { get; set; }
        public int UserRoleId { get; set; }
    }

    public class Trip : INavigateId
    {
        public int Id { get; set; }
        public int RouteId { get; set; }
        [JsonIgnore]
        public Route Route { get; set; }
        public DateTime Date { get; set; }
        public int BusId { get; set; }
        [JsonIgnore]
        public Bus Bus { get; set; }

    }

    public class FindTripQuery
    {
        [Required]
        public string Start { get; set; }
        [Required]
        public string End { get; set; }
        public DateTime Date { get; set; }

    }

    public class BookingQuery
    {
        [Required]
        public int TripId { get; set; }
        [Required]
        public int UserId { get; set; }
    }


    public class TripQuery
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public int Seats { get; set; }
    }

}