using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.UI.WebControls;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class NewUserCommand : IRequest<UserDto>
    {
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public int Age { get; set; }
        public decimal Total { get; set; }
        public string Description { get; set; }
        public DateTime? IncomeDate { get; set; }
        public string Remarks { get; set; }
    }

    public class NewUserCommandHandler : IRequestHandler<NewUserCommand, UserDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public NewUserCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(NewUserCommand request)
        {         
            using (var context = new BoilerDbContext())
            {
                var newUser = new User();
                var balance = new Balance();
                #region Handle expense
               // var expense = _dbContext.Expenses.Where(item => item.UserId == request.)
                #endregion


                using (var trans = context.Database.BeginTransaction())
                {
                    try
                    {

                        newUser = new User()
                        {
                            Firstname = request.Firstname,
                            Middlename = request.Middlename,
                            Lastname = request.Lastname,
                            Age = request.Age
                        };

                        _dbContext.Users.Add(newUser);
                        _dbContext.SaveChanges();

                        var income = new Income()
                        {
                            UserId = newUser.Id,
                            Date = request.IncomeDate,
                            Description = request.Description,
                            Total = request.Total,
                            Remarks = request.Remarks
                        };

                        _dbContext.Incomes.Add(income);
                        _dbContext.SaveChanges();

                        balance = new Balance()
                        {
                            UserId = newUser.Id,
                            BalanceDate = request.IncomeDate,
                            TotalBalance = request.Total,
                            CarriedOver = false
                        };

                        _dbContext.Balances.Add(balance);
                        _dbContext.SaveChanges();

                    }

                    catch (Exception error)
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
                    Id = newUser.Id
                };


                return newUserDto;
            }




        }
    }
}
