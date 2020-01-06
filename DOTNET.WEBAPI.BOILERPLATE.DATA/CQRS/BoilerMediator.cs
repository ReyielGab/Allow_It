using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Validation;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS
{
    public class BoilerMediator : Mediator
    {
        public BoilerMediator(IDependencyResolver resolver)
            : base(resolver) 
        {
            
        }

        public override Response<TResponseData> Request<TResponseData>(IRequest<TResponseData> request)
        {
            var response = base.Request(request);

            //Thow exception handle in the global exception
            if (response.Exception != null && response.Exception.GetBaseException() is DBConcurrencyException)
                throw response.Exception.GetBaseException();

            if (response.Exception != null && response.Exception.GetBaseException() is DbEntityValidationException)
            {
                var validationExceptions = (DbEntityValidationException)response.Exception.GetBaseException();
                throw validationExceptions;
            }


            if (response.HasException())
            {
                throw response.Exception.GetBaseException();
                //Log exception here
            }

            return response;
        }
    }
}
