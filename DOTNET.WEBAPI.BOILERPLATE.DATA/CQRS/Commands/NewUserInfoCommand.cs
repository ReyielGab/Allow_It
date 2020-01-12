using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class NewUserInfoCommand : IRequest<UserDto>
    {
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public int Age { get; set; }
        public decimal Total { get; set; }
        public string Description { get; set; }
        public DateTime? IncomeDate { get; set; }
        public string Remarks { get; set; }
        public int Id { get; set; }

    }

    public class NewUserInfoCommandHandler : IRequestHandler<NewUserInfoCommand, UserDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public NewUserInfoCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(NewUserInfoCommand request)
        {
           using (var context = new BoilerDbContext())
           {
                //var newUser = new User();

                var user = _dbContext.Users.FirstOrDefault(x => x.Id == request.Id);
                var balance = new Balance();

                using (var trans = context.Database.BeginTransaction())
                {

                    try
                    {
                        user.Firstname = request.Firstname;
                        user.Middlename = request.Middlename;
                        user.Lastname = request.Lastname;
                        user.Age = request.Age;                       

                        var income = new Income()
                        {
                            UserId = user.Id,
                            Date = request.IncomeDate,
                            Description = request.Description,
                            Total = request.Total,
                            Remarks = request.Remarks
                        };

                        _dbContext.Incomes.Add(income);
                        _dbContext.SaveChanges();

                        balance = new Balance()
                        {
                            UserId = user.Id,
                            BalanceDate = request.IncomeDate,
                            TotalBalance = request.Total,
                            CarriedOver = false
                        };

                        _dbContext.Balances.Add(balance);
                        _dbContext.SaveChanges();
                    }

                    catch(Exception e)
                    {
                        throw new Exception("Something went wrong");
                    }


                }

                var newUserDto = new UserDto()
                {
                    Firstname = request.Firstname,
                    Lastname = request.Lastname,
                    Middlename = request.Middlename,
                    Age = request.Age,
                    TotalIncome = request.Total,
                    Balance = balance.TotalBalance,
                    Id = user.Id
                };


                return newUserDto;
            }
        }
    }
}
