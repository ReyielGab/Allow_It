using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DOTNET.WEBAPI.BOILERPLATE.DOMAIN;

namespace DOTNET.WEBAPI.BOILERPLATE.DATA.Dto
{
    public class TodoDto : BaseEntity
    {
        public string Todos { get; set; }
        public bool Done { get; set; }
        public DateTime? TodoDate { get; set; }
    }
}
