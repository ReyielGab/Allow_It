using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class DoneTodoCommand : IRequest<bool>
    {
        public int TodoId { get; set; }
    }

    public class DoneTodoCommandHandler : IRequestHandler<DoneTodoCommand, bool>
    {
        private readonly IBoilerDbContext _dbContext;

        public DoneTodoCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Handle(DoneTodoCommand request)
        {
            var selectedTodo = _dbContext.Todos.FirstOrDefault(x => x.Id == request.TodoId);

            if (selectedTodo == null)
            {
                throw new Exception("No todo found");
            }

            selectedTodo.Done = true;
            _dbContext.SaveChanges();


            return true;
        }
    }
}
