using DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands;
using DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Queries;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace DOTNET.WEBAPI.BOILERPLATE.Controllers
{
    [RoutePrefix("api/Income")]
    public class IncomeController : ApiController
    {
        private readonly IMediator _mediator;

        public IncomeController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("GetIncomeByUserId")]
        [ResponseType(typeof(List<IncomeDto>))]        
        public IHttpActionResult GetIncomeByUserId([FromUri] GetIncomeByUserIdQuery query)
        {
            var request = _mediator.Request(query);

            return Ok(request.Data);
        }

        [HttpDelete]
        [Route("DeleteIncomeByIncomeId")]
        [ResponseType(typeof(int))]
        public IHttpActionResult DeleteIncomeByIncomeId([FromUri] DeleteIncomeByIncomeIdCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("NewIncome")]
        [ResponseType(typeof(IncomeDto))]
        public IHttpActionResult NewIncome ([FromBody] NewIncomeCommand command)
        {
            var response = _mediator.Request(command);

            return Created("", response.Data);
        }

        [HttpPost]
        [Route("DeleteManyIncomeByIds")]
        [ResponseType(typeof(List<int>))]
        public IHttpActionResult DeleteManyIncomeByIds(DeleteManyIncomeByIdsCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }

        [HttpPut]
        [Route("EditIncome")]
        [ResponseType(typeof(IncomeDto))]
        public IHttpActionResult EditIncome([FromBody] EditIncomeCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }


    }
}