using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class NewTodoCommand : IRequest<TodoDto>
    {
        public string Todos { get; set; }
        public DateTime TodoDate { get; set; }
        public int UserId { get; set; }
    }

    public class NewTodoCommandHandler : IRequestHandler<NewTodoCommand, TodoDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public NewTodoCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public TodoDto Handle(NewTodoCommand request)
        {

            var newTodos = new Expense()
            {
                Done = false,
                Todos = request.Todos,
                TodoDate = request.TodoDate,
                UserId = request.UserId
            };

            _dbContext.Todos.Add(newTodos);

            var samp = _dbContext.Todos.Select(x => x).ToList();
            _dbContext.SaveChanges();

            return Mapper.Map<TodoDto>(newTodos);
        }


    }
}
