using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EAD_WebService.Dto.Email;

namespace EAD_WebService.Services.Interfaces
{
    public interface IEmailService
    {
        public Task<Task> SendEmailAsync(EmailDto emailDto);

    }
}