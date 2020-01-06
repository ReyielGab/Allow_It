using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class DeleteManyExpenseByIdsCommand : IRequest<List<int>>
    {
        public List<ExpenseDto> Expense;
    }
    public class DeleteManyExpenseByIdsCommandHandler : IRequestHandler<DeleteManyExpenseByIdsCommand, List<int>>
    {
        private readonly IBoilerDbContext _dbContext;

        public DeleteManyExpenseByIdsCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<int> Handle(DeleteManyExpenseByIdsCommand request)
        {

            var expenseIds = request.Expense.Select(x => x.Id).ToList();

            var listOfExpense = _dbContext.Expenses.Where(x => expenseIds.Contains(x.Id)).ToList();

            if (!listOfExpense.Any())
            {
                throw new Exception("Something went wrong");
            }


            _dbContext.Expenses.RemoveRange(listOfExpense);

            return expenseIds;
        }
    }
}
