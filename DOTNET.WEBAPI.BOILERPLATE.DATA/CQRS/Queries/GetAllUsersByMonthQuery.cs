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
    public class GetAllUsersByMonthQuery : IRequest<List<UserDto>>
    {
        public DateTime SelectedMonth { get; set; }

    }

    public class GetAllUsersByMonthQueryHandler : IRequestHandler<GetAllUsersByMonthQuery, List<UserDto>>
    {
        private readonly IBoilerDbContext _dbContext;

        public GetAllUsersByMonthQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<UserDto> Handle(GetAllUsersByMonthQuery request)
        {
            DateTime selectedMonth = request.SelectedMonth.AddMonths(1);
            selectedMonth = DateTime.SpecifyKind(selectedMonth, DateTimeKind.Utc);
            var selectedMonths = selectedMonth.Month;            

            var allUsers = _dbContext.Users.Select(x => new UserDto()
            {
                Id = x.Id,
                Firstname = x.Firstname,
                Middlename = x.Middlename,
                Lastname = x.Lastname,
                Age = x.Age,
                Expenses = x.Expenses.Where(a => a.Date.Value.Month == selectedMonths).ToList(),
                Income = x.Income,
                TotalIncome = x.Income.Where(a => a.Date.Value.Month == selectedMonths).Sum(aaa => aaa.Total),
                TotalExpenseItem = x.Expenses.Where(item => item.Date.Value.Month == selectedMonths).ToList().Count(),
                TotalExpenseCost = x.Expenses.Where(a => a.Date.Value.Month == selectedMonths).Sum(aaa => aaa.Total),
                Balance = (!x.Income.Any() ? 0 : x.Income.FirstOrDefault().Total) - x.Expenses.Where(a => a.Date.Value.Month == selectedMonths).Sum(aaa => aaa.Total)
            }).OrderBy(x => x.Id).ToList();           

            return allUsers;
        }
    }
}
