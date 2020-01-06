using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;

namespace DOTNET.WEBAPI.BOILERPLATE.IoC.Installers
{
    public class ControllersInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Classes.FromThisAssembly()
                    .Pick()
                    .If(t => t.Name.EndsWith("Controller"))
                    .Configure(configure => configure.Named(configure.Implementation.Name))
                    .LifestylePerWebRequest());
        }
    }
}