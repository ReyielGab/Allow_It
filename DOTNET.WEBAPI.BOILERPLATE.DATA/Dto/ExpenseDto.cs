using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;
using System;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.Dto
{
    public class ExpenseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public decimal Total { get; set; }
        public ExpenseStatus Status { get; set; }
        public string Description { get; set; }
        public string Remarks { get; set; }
        public DateTime? Date { get; set; }

    }
}
