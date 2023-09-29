using EAD_WebService.Dto.Email;
using MailKit.Net.Smtp;
using MimeKit;


namespace EAD_WebService.Services.Core
{
    public class EmailService : IEmailService
    {

        private IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {

            _configuration = configuration;
        }
        public async Task<Task> SendEmailAsync(EmailDto emailDto)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_configuration["Email:Email"]));
            email.To.Add(MailboxAddress.Parse(emailDto.to));
            email.Subject = emailDto.subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = emailDto.body;
            email.Body = builder.ToMessageBody();
            var smtp = new SmtpClient();
            smtp.Connect(_configuration["Email:Host"], Convert.ToInt32(_configuration["Email:Port"]), true);
            smtp.Authenticate(_configuration["Email:Email"], _configuration["Email:Password"]);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
            return Task.CompletedTask;
        }
    }
}