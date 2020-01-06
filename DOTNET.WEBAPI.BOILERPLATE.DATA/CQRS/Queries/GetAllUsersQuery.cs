
using System;
using System.Collections.Generic;
using System.Linq;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Queries
{
    public class GetAllUsersQuery : IRequest<List<UserDto>>
    {
    }

    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserDto>>
    {
        private readonly IBoilerDbContext _dbContext;

        public GetAllUsersQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<UserDto> Handle(GetAllUsersQuery request)
        {


            var allUsers = _dbContext.Users.Select(x => new UserDto()
            {
                Id = x.Id,
                Firstname = x.Firstname,
                Middlename = x.Middlename,
                Lastname = x.Lastname,
                Age = x.Age,
                Expenses = x.Expenses,
                Income = x.Income,
                TotalIncome = x.Income.Where(item => item.Date.Value.Month == DateTime.Now.Month).ToList().Sum(aaa => aaa.Total),
                TotalExpenseItem = x.Expenses.Where(item => item.Date.Value.Month == DateTime.Now.Month).ToList().Count(),
                TotalExpenseCost = x.Expenses.Where(a => a.Date.Value.Month == DateTime.Now.Month).Sum(aaa => aaa.Total),
                Balance = (!x.Income.Any() ? 0 : x.Income.Where(a => a.Date.Value.Month == DateTime.Now.Month).Sum(aaa => aaa.Total)) 
                - x.Expenses.Where(a => a.Date.Value.Month == DateTime.Now.Month).Sum(aaa => aaa.Total)
            }).ToList();



            return allUsers;
        }
    }

  
}
