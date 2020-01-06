using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using Omu.ValueInjecter;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class EditUserCommand : IRequest<UserDto>
    {
        public int Id { get; set; }
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public int Age { get; set; }
    }

    public class EditUserCommandHandler : IRequestHandler<EditUserCommand, UserDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public EditUserCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(EditUserCommand request)
        {
            var selectedUser = _dbContext.Users.FirstOrDefault(x => x.Id == request.Id);

            if (selectedUser == null)
            {
                throw new Exception("No user found");
            }

            selectedUser.Lastname = request.Lastname;
            selectedUser.Firstname = request.Firstname;
            selectedUser.Middlename = request.Middlename;
            selectedUser.Age = request.Age;

            _dbContext.SaveChanges();


            return Mapper.Map<UserDto>(selectedUser);
        }
    }
}
