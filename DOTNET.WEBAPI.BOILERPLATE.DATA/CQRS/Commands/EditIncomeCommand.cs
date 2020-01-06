using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using Omu.ValueInjecter;
using ShortBus;
using System.Linq;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class EditIncomeCommand : IRequest<IncomeDto>
    {
        public IncomeDto Income { get; set; }
    }
    public class EditIncomeCommandHandler : IRequestHandler<EditIncomeCommand, IncomeDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public EditIncomeCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IncomeDto Handle(EditIncomeCommand request)
        {
            var selectedIncome = _dbContext.Incomes.FirstOrDefault(x => x.Id == request.Income.Id);

            selectedIncome.Date = request.Income.Date;
            selectedIncome.Description = request.Income.Description;
            selectedIncome.Remarks = request.Income.Remarks;
            selectedIncome.Total = request.Income.Total;

            _dbContext.SaveChanges();

            return Mapper.Map<IncomeDto>(selectedIncome);
        }
    }
}
