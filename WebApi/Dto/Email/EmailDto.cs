using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_WebService.Dto.Email
{
    public class EmailDto
    {
        public string to { get; set; } = null!;
        public string subject { get; set; } = null!;
        public string body { get; set; } = null!;
    }
}