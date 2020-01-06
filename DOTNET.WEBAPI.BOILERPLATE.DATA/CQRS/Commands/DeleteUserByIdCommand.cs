using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using Omu.ValueInjecter;
using ShortBus;
using System.Linq;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class DeleteUserByIdCommand : IRequest<UserDto>
    {
        public int Id { get; set; }
    }

    public class DeleteUserByIdCommandHandler : IRequestHandler<DeleteUserByIdCommand, UserDto>
    {

        private readonly IBoilerDbContext _dbContext;

        public DeleteUserByIdCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(DeleteUserByIdCommand request)
        {
            var selectedUSer = _dbContext.Users.FirstOrDefault(users => users.Id == request.Id);

            var selectedUserDto = Mapper.Map<UserDto>(selectedUSer);

            _dbContext.Users.Remove(selectedUSer);

            _dbContext.SaveChanges();

            return selectedUserDto;
        }

    }
}
