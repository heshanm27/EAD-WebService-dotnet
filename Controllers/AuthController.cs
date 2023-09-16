using Microsoft.AspNetCore.Mvc;

namespace EAD_WebService.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        
        [HttpPost("login")]
        public IActionResult Login() 
        {
            return Ok("Login");
        }

        [HttpPost("register")]
        public IActionResult Register()
        {
            return Ok("Register");
        }

        [HttpPost("forgot-password")]
        public IActionResult ForgotPassword()
        {
            return Ok("Forgot Password");
        }


        [HttpPost("change-password")]
        public IActionResult ChangePassword()
        {
            return Ok("Change Password");
        }

      

        [HttpPost("verify-email")]

        public IActionResult VerifyEmail()
        {
            return Ok("Verify Email");
        }

     


    }
}