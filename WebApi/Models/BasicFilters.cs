using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_WebService.Models
{
    public class BasicFilters
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Order { get; set; }
        public string? Search { get; set; }

    }
}