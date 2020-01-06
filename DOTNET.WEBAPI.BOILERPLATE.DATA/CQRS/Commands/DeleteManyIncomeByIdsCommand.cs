using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class DeleteManyIncomeByIdsCommand : IRequest<List<int>>
    {
        public List<Income> Income { get; set; } 
    }
    public class DeleteManyIncomeByIdsCommandHandler : IRequestHandler<DeleteManyIncomeByIdsCommand, List<int>>
    {
        private readonly IBoilerDbContext _dbContext;

        public DeleteManyIncomeByIdsCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<int> Handle(DeleteManyIncomeByIdsCommand request)
        {

            var incomeIds = request.Income.Select(x => x.Id).ToList();

            var listOfIncome = _dbContext.Incomes.Where(x => incomeIds.Contains(x.Id)).ToList();

            if (!listOfIncome.Any())
            {
                throw new Exception("Something went wrong");
            }


            _dbContext.Incomes.RemoveRange(listOfIncome);

            return incomeIds;


        }
    }
}



