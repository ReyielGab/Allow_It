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
    public class GetIncomeByUserIdQuery : IRequest<List<IncomeDto>>
    {
        public int UserId { get; set; }
    }

    public class GetIncomeByUserIdQueryHandler : IRequestHandler<GetIncomeByUserIdQuery, List<IncomeDto>>
    {

        private readonly IBoilerDbContext _dbContext;

        public GetIncomeByUserIdQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<IncomeDto> Handle(GetIncomeByUserIdQuery request)
        {
            var income = _dbContext.Incomes.Where(x => x.UserId == request.UserId).ToList();

            return income.Select(x => Mapper.Map<IncomeDto>(x)).ToList();
        }
    }


}
