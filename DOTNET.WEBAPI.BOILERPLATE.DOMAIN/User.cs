using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DOMAIN
{
    public class User : BaseEntity
    {
        public string Lastname { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public int Age { get; set; }
        public List<Expense> Expenses { get; set; }
        public List<Income> Income { get; set; }
        public List<Balance> Balances { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
