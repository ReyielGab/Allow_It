using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DOMAIN
{
    public class Balance : BaseEntity
    {
        public int UserId { get; set; }
        public bool CarriedOver { get; set; }
        public decimal? TotalBalance { get; set; }
        public DateTime? BalanceDate { get; set; }
    }
}
