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
    public class GetUserInfoByIdQuery : IRequest<UserDto>
    {
        public int UserId { get; set; }
    }

    public class GetUserInfoByIdQueryHandler : IRequestHandler<GetUserInfoByIdQuery, UserDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public GetUserInfoByIdQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(GetUserInfoByIdQuery request)
        {

            var user = _dbContext.Users.FirstOrDefault(x => x.Id == request.UserId);

            if(user == null)
            {
                throw new Exception("No user exist");
            }

            var userIncome = _dbContext.Incomes.Where(x => x.UserId == request.UserId);
            var userExpense = _dbContext.Expenses.Where(x => x.UserId == request.UserId);
            var userBalance = _dbContext.Balances.Where(x => x.UserId == request.UserId);

            var userInfo = Mapper.Map<UserDto>(user);

            userInfo.TotalIncome = userIncome.Where(item => item.Date.Value.Month == DateTime.Now.Month).ToList().Sum(aaa => aaa.Total);
            userInfo.TotalExpenseItem = userExpense.Where(item => item.Date.Value.Month == DateTime.Now.Month).ToList().Count();
            userInfo.TotalExpenseCost = userExpense.Any(item => item.Date.Value.Month == DateTime.Now.Month) ?
                userExpense.Where(a => a.Date.Value.Month == DateTime.Now.Month).Sum(aaa => aaa.Total) : 0;
            userInfo.Balance = userBalance.Any(a => a.BalanceDate.Value.Month == DateTime.Now.Month) ?
                userBalance.FirstOrDefault(a => a.UserId == request.UserId).TotalBalance : 0;

            return userInfo;
        }
    }
}
