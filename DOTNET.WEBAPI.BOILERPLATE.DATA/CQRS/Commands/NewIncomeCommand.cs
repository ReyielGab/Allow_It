using DOTNET.WEBAPI.BOILERPLATE.DATA.Context;
using DOTNET.WEBAPI.BOILERPLATE.DATA.Dto;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using Omu.ValueInjecter;
using ShortBus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.CQRS.Commands
{
    public class NewIncomeCommand : IRequest<IncomeDto>
    {
        public int UserId { get; set; }
        public decimal Total { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public DateTime? Date { get; set; }
    }

    public class NewIncomeCommandHandler : IRequestHandler<NewIncomeCommand, IncomeDto>
    {
        private readonly IBoilerDbContext _dbContext;

        public NewIncomeCommandHandler(IBoilerDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IncomeDto Handle(NewIncomeCommand request)
        {
            var previousIncomeTotal = _dbContext.Incomes.Where(x => x.UserId == request.UserId && (x.Date.Value.Month == request.Date.Value.Month
                         && x.Date.Value.Year == request.Date.Value.Year)).Sum(aaa => (decimal?) aaa.Total) ?? 0;
            var totalCurrentIncome = previousIncomeTotal + request.Total;

            var expenseTotal = _dbContext.Expenses.Where(x => x.UserId == request.UserId && (x.Date.Value.Month == request.Date.Value.Month
                         && x.Date.Value.Year == request.Date.Value.Year)).Sum(aaa => (decimal?)aaa.Total) ?? 0;            

            var newIncome = Mapper.Map<Income>(request);

            //Update the balance if there's balance if not create balance
            var balance = _dbContext.Balances.FirstOrDefault(x => x.UserId == request.UserId
            && (x.BalanceDate.Value.Month == request.Date.Value.Month && x.BalanceDate.Value.Year == request.Date.Value.Year));

            var newBalance = new Balance();
            if (balance == null)
            {
                newBalance.BalanceDate = request.Date;
                newBalance.TotalBalance = totalCurrentIncome - expenseTotal;
                newBalance.UserId = request.UserId;

                _dbContext.Balances.Add(newBalance);
            }
            else
            {
                balance.TotalBalance = totalCurrentIncome - expenseTotal;
                balance.BalanceDate = request.Date;
            }



            #region Update Balance
            //Update Balance
            //balance = new Balance()
            //{
            //    BalanceDate = request.Date,
            //    TotalBalance = totalCurrentIncome - expenseTotal,
            //    UserId = request.UserId,

            //};
            //_dbContext.Balances.Add(balance);
            #endregion


            _dbContext.Incomes.Add(newIncome);
            _dbContext.SaveChanges();


            var incomeDto = new IncomeDto()
            {
                //CarriedOver = balanceIsCarriedOver,
                UserId = request.UserId,
                Date = request.Date,
                Description = request.Description,
                Id = newIncome.Id,
                Remarks = request.Remarks,
                Total = request.Total
            };

            return incomeDto;


        }
    }

}
