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
    public class GetAllExpenseByUserIdQuery : IRequest<List<ExpenseDto>>
    {
        public int UserId { get; set; }
    }

    public class GetAllExpenseByUserIdQueryHandler : IRequestHandler<GetAllExpenseByUserIdQuery, List<ExpenseDto>>
    {

        private readonly IBoilerDbContext _dbContext;

        public GetAllExpenseByUserIdQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<ExpenseDto> Handle(GetAllExpenseByUserIdQuery request)
        {

            var expenses = _dbContext.Expenses.Where(x => x.UserId == request.UserId).ToList();

            return expenses.Select(x => Mapper.Map<ExpenseDto>(x)).ToList();
        }
    }

}
