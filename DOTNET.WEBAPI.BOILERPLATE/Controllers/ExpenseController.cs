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

    [RoutePrefix("api/Expense")]
    public class ExpenseController : ApiController
    {
        private readonly IMediator _mediator;

        public ExpenseController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet]
        [Route("GetAllExpenseByUserId")]
        [ResponseType(typeof(List<ExpenseDto>))]
        public IHttpActionResult GetAllExpenseByUserId([FromUri] GetAllExpenseByUserIdQuery query)
        {
            var request = _mediator.Request(query);

            return Ok(request.Data);
        }

        [HttpPost]
        [Route("NewExpense")]     
        [ResponseType(typeof(ExpenseDto))]
        public IHttpActionResult NewExpense([FromBody] NewExpenseCommand command)
        {
            var request = _mediator.Request(command);

            return Created("", request.Data);
        }
        
        [HttpDelete]
        [Route("DeleteExpenseByExpenseId")]
        [ResponseType(typeof(int))]
        public IHttpActionResult DeleteExpenseByExpenseId([FromUri] DeleteExpenseByExpenseIdCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("DeleteManyExpenseByIds")]
        [ResponseType(typeof(List<int>))]
        public IHttpActionResult DeleteManyExpenseByIds([FromBody] DeleteManyExpenseByIdsCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }




    }
}