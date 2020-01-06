using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.Dto
{
    public class UserDto : BaseEntity
    {
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public int Age { get; set; }
        public List<Expense> Expenses { get; set; }
        public List<Income> Income { get; set; }
        public int TotalExpenseItem { get; set; }
        public decimal? TotalExpenseCost { get; set; }
        public decimal? TotalIncome { get; set; }

        public decimal? Balance { get; set; }

    }

}
