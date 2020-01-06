using System.Threading.Tasks;
using System.Web.Cors;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

namespace DOTNET.WEBAPI.BOILERPLATE
{
    public partial class Startup
    {

        public void ConfigureCors(IAppBuilder app)
        {
            app.UseCors(CorsOptions.AllowAll);
        }

        public class AuthCorsPolicy : ICorsPolicyProvider
        {
            public Task<CorsPolicy> GetCorsPolicyAsync(IOwinRequest request)
            {
                var policy = new CorsPolicy
                {
                    AllowAnyMethod = true,
                    AllowAnyHeader = true
                };

                policy.Origins.Add("*");
                policy.Origins.Add("http://localhost:9092");

                return Task.FromResult(policy);
            }

        }


    }
}