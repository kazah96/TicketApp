using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
            //    var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("serverconf.json");
            //     // создаем конфигурацию
            //     Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("serverconf.json");

            services.AddDbContext<TicketDB>();
            services.AddCors(options =>
   {
       options.AddPolicy("AllowAllOrigin", builderw =>
       {
           builderw.AllowAnyOrigin();
           builderw.AllowAnyMethod();
           builderw.AllowAnyHeader();
       });
   });

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
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

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "api",
                    template: "api/{controller}/{action}");

            });
        }
    }
}
