using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Server.Controllers;
using Server.Models;

namespace Server
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {

        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("serverconf.json");

            services.AddDbContext<TicketDB>();

            services.AddCors(options =>
   {
       options.AddPolicy("AllowAllOrigin", builderw =>
       {
           builderw.AllowCredentials();
           builderw.AllowAnyOrigin();
           builderw.AllowAnyMethod();
           builderw.AllowAnyHeader();
       });

   });
            services.AddSession(o =>
                       {
                         o.Cookie.HttpOnly=false;
                        
                       });
            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env
        , ILoggerFactory logger)
        {
            //logger.Add

            app.UseCors("AllowAllOrigin");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseSession();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "api",
                    template: "api/{controller}/{action}");

            });
        }
    }
}
