
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS;
using DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Queries;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.IoC.Installers
{
    public class CommandQueryInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            DependencyResolver.SetResolver(new ShortBus.Windsor.WindsorDependencyResolver(container));
            container.Register(Component.For<IDependencyResolver>().Instance(DependencyResolver.Current));
            container.Register(Component.For(typeof (IMediator)).ImplementedBy(typeof (BoilerMediator)));

            container.Register(Classes.FromAssembly(typeof(BoilerMediator).Assembly)
                   .BasedOn(
                      typeof(IRequestHandler<,>),
                      typeof(IAsyncRequestHandler<,>),
                      typeof(IAsyncNotificationHandler<>))
                   .WithService.Base()
                   .LifestylePerWebRequest());

            container.Register(Classes.FromAssembly(typeof(GetAllUsersQuery).Assembly).BasedOn(
            typeof(IRequestHandler<,>),
            typeof(IAsyncRequestHandler<,>),
            typeof(IAsyncNotificationHandler<>))
            .WithService.Base()
            .LifestylePerWebRequest());
        }
    }
}