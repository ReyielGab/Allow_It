using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.Dto
{
    public class IncomeDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Total { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public DateTime? Date { get; set; }
        public bool CarriedOver { get; set; }
    }
}
