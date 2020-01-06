using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;

namespace DOTNET.WEBAPI.BOILERPLATE.IoC.Installers
{
    public class DbContextInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IBoilerDbContext>()
                    .ImplementedBy(typeof (BoilerDbContext))
                    .DependsOn(Dependency.OnValue<string>("name=BoilerDbCtx"))
                    .LifestylePerWebRequest());
        }
    }
}