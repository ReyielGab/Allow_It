using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class DeleteIncomeByIncomeIdCommand : IRequest<int>
    {
        public int IncomeId { get; set; }
    }

    public class DeleteIncomeByIncomeIdCommandHandler : IRequestHandler<DeleteIncomeByIncomeIdCommand, int>
    {
        private readonly IBoilerDbContext _dbContext;

        public DeleteIncomeByIncomeIdCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public int Handle(DeleteIncomeByIncomeIdCommand request)
        {

            var selectedIncome = _dbContext.Incomes.FirstOrDefault(x => x.Id == request.IncomeId);

            if(selectedIncome == null)
            {
                throw new Exception("Income does not exist");
            }

            _dbContext.Incomes.Remove(selectedIncome);
            _dbContext.SaveChanges();

            return selectedIncome.Id;
        }
    }

}
