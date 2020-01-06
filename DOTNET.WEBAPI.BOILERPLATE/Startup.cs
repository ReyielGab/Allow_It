using System.Web.Http;
using System.Web.Mvc;
using Castle.Windsor;
using Castle.Windsor.Installer;
using DOTNET.WEBAPI.BOILERPLATE;
using DOTNET.WEBAPI.BOILERPLATE.IoC;
using Microsoft.Owin;
using Owin;
using ShortBus;

[assembly: OwinStartup(typeof(Startup))]

namespace DOTNET.WEBAPI.BOILERPLATE
{
    public partial class Startup
    {

        public static IWindsorContainer Container { get; private set; }

        public void Configuration(IAppBuilder app)
        {
            ConfigurationContainer();
            ConfigureAuth(app);
        }


        public void ConfigurationContainer()
        {
            var container = new WindsorContainer();
            
            GlobalConfiguration.Configuration.DependencyResolver = new WindsorDependencyResolver(container.Kernel);
            container.Install(FromAssembly.This());
            
            WindsorControllerFactory controllerFactory = new WindsorControllerFactory(container.Kernel);
            ControllerBuilder.Current.SetControllerFactory(controllerFactory);

          
        }
    }
}
