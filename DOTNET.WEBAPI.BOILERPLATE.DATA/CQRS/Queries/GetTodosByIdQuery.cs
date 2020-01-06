using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using Omu.ValueInjecter;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Queries
{
    public class GetTodosByIdQuery : IRequest<List<TodoDto>>
    {
        public int UserId { get; set; }
    }

    public class GetTodosByIdQueryHandler : IRequestHandler<GetTodosByIdQuery, List<TodoDto>>
    {
        private readonly IBoilerDbContext _dbContext;

        public GetTodosByIdQueryHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<TodoDto> Handle(GetTodosByIdQuery request)
        {

            var todos = _dbContext.Todos.Where(x => x.UserId == request.UserId).ToList();



            return todos.Select(t => Mapper.Map<TodoDto>(t)).ToList();
        } 
    }
}
