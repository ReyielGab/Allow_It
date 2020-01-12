using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using Omu.ValueInjecter;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Queries
{
    public class CheckIfUserExistQuery : IRequest<UserDto>
    {
        public string Password { get; set; }
        public string UserName { get; set; }
    }

    public class CheckIfUserExistQueryHandler : IRequestHandler<CheckIfUserExistQuery, UserDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public CheckIfUserExistQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(CheckIfUserExistQuery request)
        {
            var passwordEncrypted = Eramake.eCryptography.Encrypt(request.Password);

            var userExist = _dbContext.Users.FirstOrDefault(x => x.Password == passwordEncrypted);

            if(userExist == null)
            {
                throw new Exception("No such user exist!");
            }

            return Mapper.Map<UserDto>(userExist);
        }
    }
}
