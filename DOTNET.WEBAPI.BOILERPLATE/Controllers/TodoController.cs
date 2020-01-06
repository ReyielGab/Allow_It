using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands;
using DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Queries;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.Controllers
{
    [RoutePrefix("api/Todo")]
    public class TodoController : ApiController
    {
        private readonly IMediator _mediator;

        public TodoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [Route("GetTodosById")]
        [ResponseType(typeof (List<TodoDto>))]
        public IHttpActionResult GetTodosById([FromUri] GetTodosByIdQuery query)
        {
            var response = _mediator.Request(query);

            return Ok(response.Data);
        }

        [HttpDelete]
        [Route("DeleteTodoById")]
        [ResponseType(typeof (bool))]
        public IHttpActionResult DeleteTodoById([FromUri] DeleteTodoByIdCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("NewTodo")]
        [ResponseType(typeof (TodoDto))]
        public IHttpActionResult NewTodo(NewTodoCommand command)
        {
            var response = _mediator.Request(command);

            return Created("", response.Data);
        }

        [HttpPut]
        [Route("DoneTodo")]
        [ResponseType(typeof (bool))]
        public IHttpActionResult DoneTodo([FromUri] DoneTodoCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }

    }
}