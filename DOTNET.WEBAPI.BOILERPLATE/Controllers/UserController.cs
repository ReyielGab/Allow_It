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
    [RoutePrefix("api/Users")]
    public class UserController : ApiController
    {
        private readonly IMediator _mediator;

        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [HttpGet]
        [Route("GetAllUsers")]
        [ResponseType(typeof(List<UserDto>))]
        public IHttpActionResult GetAllUsers()
        {
            var response = _mediator.Request(new GetAllUsersQuery());

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("NewUser")]
        [ResponseType(typeof (UserDto))]
        public IHttpActionResult NewUser(NewUserCommand command)
        {
            var response = _mediator.Request(command);

            return Created("", response.Data);
        }

        [HttpPut]
        [Route("EditUser")]
        [ResponseType(typeof (UserDto))]
        public IHttpActionResult EditUser(EditUserCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }

        [HttpDelete]
        [Route("DeleteUser")]
        [ResponseType(typeof(UserDto))]
        public IHttpActionResult DeleteUser([FromUri] DeleteUserByIdCommand command)
        {
            var response = _mediator.Request(command);

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("GetAllUsersBySelectedMonth")]
        [ResponseType(typeof(List<UserDto>))]
        public IHttpActionResult GetAllUsersBySelectedMonth([FromBody] GetAllUsersByMonthQuery query)
        {
            var response = _mediator.Request(query);

            return Ok(response.Data);
        }


        [HttpPost]
        [Route("SignUpNewUser")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult SignUpNewUser([FromBody] SignUpNewUserCommand command)
        {
            var response = _mediator.Request(command);

            return Created("", response.Data);
        }

        [HttpGet]
        [Route("CheckIfUserExist")]
        [ResponseType(typeof(UserDto))]
        public IHttpActionResult GetUserInfo([FromUri] CheckIfUserExistQuery query)
        {
            var response = _mediator.Request(query);

            return Ok(response.Data);
        }

        [HttpGet]
        [Route("GetUserInfoById")]
        [ResponseType(typeof(UserDto))]
        public IHttpActionResult GetUserInfoById([FromUri] GetUserInfoByIdQuery query)
        {
            var response = _mediator.Request(query);

            return Ok(response.Data);
        }

        [HttpPost]
        [Route("NewUserInfo")]
        [ResponseType(typeof(UserDto))]
        public IHttpActionResult NewUserInfo([FromBody] NewUserInfoCommand command)
        {
            var response = _mediator.Request(command);

            return Created("", response.Data);
        }

        [HttpPost]
        [Route("GetAllUserInfoByMonth")]
        [ResponseType(typeof(UserDto))]
        public IHttpActionResult GetAllUserInfoByMonth([FromBody] GetAllUserInfoByMonthQuery query)
        {
            var response = _mediator.Request(query);

            return Ok(response.Data);
        }


    }
}