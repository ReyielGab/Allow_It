using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;
using System;
using System.Linq;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class NewExpenseCommand : IRequest<ExpenseDto>
    {
        public int UserId { get; set; }
        public decimal Total { get; set; }
        public ExpenseStatus Status { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public DateTime? ExpenseDate { get; set; }
    }

    public class NewExpenseCommandHandler : IRequestHandler<NewExpenseCommand, ExpenseDto>
    {

        private readonly IBoilerDbContext _dbContext;

        public NewExpenseCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public ExpenseDto Handle(NewExpenseCommand request)
        {

            var previousExpenseTotal = _dbContext.Expenses.Where(x => x.UserId == request.UserId
                                        && (x.Date.Value.Month == request.ExpenseDate.Value.Month
                                        && x.Date.Value.Year == request.ExpenseDate.Value.Year)).Sum(aaa => (decimal?)aaa.Total) ?? 0;

            var totalCurrentExpense = previousExpenseTotal + request.Total;

            var incomeTotal = _dbContext.Incomes.Where(x => x.UserId == request.UserId && (x.Date.Value.Month == request.ExpenseDate.Value.Month
                         && x.Date.Value.Year == request.ExpenseDate.Value.Year)).Sum(aaa => (decimal?)aaa.Total) ?? 0;

            //Update the balance
            var balance = _dbContext.Balances.FirstOrDefault(x => x.UserId == request.UserId
            && (x.BalanceDate.Value.Month == request.ExpenseDate.Value.Month && x.BalanceDate.Value.Year == request.ExpenseDate.Value.Year));

            var newBalance = new Balance();
            if (balance == null)
            {
                newBalance.BalanceDate = request.ExpenseDate;
                newBalance.TotalBalance = incomeTotal - totalCurrentExpense;
                newBalance.UserId = request.UserId;

                _dbContext.Balances.Add(newBalance);
            }
            else
            {
                balance.TotalBalance = incomeTotal - totalCurrentExpense;
                balance.BalanceDate = request.ExpenseDate;
            }


            var newExpense = new Expense
            {
                Date = request.ExpenseDate,
                Description = request.Description,
                Remarks = request.Remarks,
                Status = request.Status,
                Total = request.Total,
                UserId = request.UserId
            };          

            _dbContext.Expenses.Add(newExpense);
            _dbContext.SaveChanges();


            return Mapper.Map<ExpenseDto>(newExpense);
        }
    }
}
