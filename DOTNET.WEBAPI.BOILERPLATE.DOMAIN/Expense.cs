using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DOMAIN
{
    public class Expense : BaseEntity
    {
        public int UserId { get; set; }
        public decimal Total { get; set; }
        public ExpenseStatus Status { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }

        public DateTime? Date { get; set; }
    }

    public enum ExpenseStatus
    {
        InProgress,
        Submitted,
        Rejected,
        Approved
    }
}
