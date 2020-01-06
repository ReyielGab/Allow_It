using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class DeleteExpenseByExpenseIdCommand : IRequest<int>
    {
        public int ExpenseId { get; set; }
    }

    public class DeleteExpenseByExpenseIdCommandHandler : IRequestHandler<DeleteExpenseByExpenseIdCommand, int>
    {
        private readonly IBoilerDbContext _dbContext;

        public DeleteExpenseByExpenseIdCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int Handle(DeleteExpenseByExpenseIdCommand request)
        {

            var selectedExpense = _dbContext.Expenses.FirstOrDefault(expense => expense.Id == request.ExpenseId);

            if(selectedExpense == null)
            {
                throw new Exception("Expense does not exist");
            }

            _dbContext.Expenses.Remove(selectedExpense);
            _dbContext.SaveChanges();

            return selectedExpense.Id;
        }
    }
}
