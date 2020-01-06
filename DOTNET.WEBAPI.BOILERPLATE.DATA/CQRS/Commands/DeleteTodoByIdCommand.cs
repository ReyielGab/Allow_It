using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class DeleteTodoByIdCommand : IRequest<bool>
    {
        public int TodoId { get; set; }

    }

    public class DeleteTodoByIdCommandHandler : IRequestHandler<DeleteTodoByIdCommand, bool>
    {
        private readonly IBoilerDbContext _dbContext;

        public DeleteTodoByIdCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool Handle(DeleteTodoByIdCommand request)
        {
            var todo = _dbContext.Todos.FirstOrDefault(x => x.Id == request.TodoId);

            if (todo == null)
            {
                throw new Exception("No todo found");
            }

            _dbContext.Todos.Remove(todo);

            _dbContext.SaveChanges();

            return true;
        }
    }
}
