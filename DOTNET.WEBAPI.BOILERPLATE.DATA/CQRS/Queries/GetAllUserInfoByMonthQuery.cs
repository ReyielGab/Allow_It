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
    public class GetAllUserInfoByMonthQuery : IRequest<UserDto>
    {
        public DateTime SelectedMonth { get; set; }

        public int UserId { get; set; }
    }

    public class GetAllUserInfoByMonthQueryHandler : IRequestHandler<GetAllUserInfoByMonthQuery, UserDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public GetAllUserInfoByMonthQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public UserDto Handle(GetAllUserInfoByMonthQuery request)
        {
            DateTime selectedMonth = request.SelectedMonth.AddMonths(1);
            selectedMonth = DateTime.SpecifyKind(selectedMonth, DateTimeKind.Utc);
            var selectedMonths = selectedMonth.Month;

            var selectedUser = _dbContext.Users.FirstOrDefault(x => x.Id == request.UserId);

            var userIncome = _dbContext.Incomes.Where(x => x.UserId == request.UserId);
            var userExpense = _dbContext.Expenses.Where(x => x.UserId == request.UserId);
            var userBalance = _dbContext.Balances.Where(x => x.UserId == request.UserId);

            var userInfo = Mapper.Map<UserDto>(selectedUser);

            userInfo.TotalIncome = userIncome.Where(item => item.Date.Value.Month == selectedMonths).ToList().Sum(aaa => aaa.Total);
            userInfo.TotalExpenseItem = userExpense.Where(item => item.Date.Value.Month == selectedMonths).ToList().Count();
            userInfo.TotalExpenseCost = userExpense.Any(item => item.Date.Value.Month == selectedMonths) ?
                userExpense.Where(a => a.Date.Value.Month == selectedMonths).Sum(aaa => aaa.Total) : 0;
            userInfo.Balance = userBalance.Any(a => a.BalanceDate.Value.Month == selectedMonths) ?
                userBalance.FirstOrDefault(a => a.UserId == request.UserId).TotalBalance : 0;

            return userInfo;
        }
    }
}
