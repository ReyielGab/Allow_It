using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class SignUpNewUserCommand : IRequest<bool>
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class SignUpNewUserCommandHandler : IRequestHandler<SignUpNewUserCommand, bool>
    {
        private readonly IBoilerDbContext _dbContext;

        public SignUpNewUserCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Handle(SignUpNewUserCommand request)
        {
            //var newUser = _dbContext.Users.FirstOrDefault()

            var encryptPassword = Eramake.eCryptography.Encrypt(request.Password);

            var newUser = new User()
            {
                UserName = request.UserName,
                Password = encryptPassword
            };

            _dbContext.Users.Add(newUser);
            _dbContext.SaveChanges();


            return true;
        }
    }
}
