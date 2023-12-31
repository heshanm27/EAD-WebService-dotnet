using EAD_WebService.Dto.Auth;
using Microsoft.AspNetCore.Mvc;

/*
    File: AuthController.cs
    Author:
    Description: This file is used to authorize the users.
*/

namespace EAD_WebService.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        //Verifies the user by using username and password

        [HttpPost("login")]
        public async Task<ActionResult<ServiceResponse<LoginSuccessDto>>> Login(LoginUserDto loginUserDto)
        {
            ServiceResponse<LoginSuccessDto> response = await _authService.loginUser(loginUserDto);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //Api for create new account

        [HttpPost("register")]
        public async Task<ActionResult<ServiceResponse<LoginSuccessDto>>> Register([FromForm] RegisterUserDto registerUserDto)
        {


            ServiceResponse<LoginSuccessDto> response = await _authService.registerUser(registerUserDto);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        // [HttpPost("forgot-password")]
        // public IActionResult ForgotPassword()
        // {
        //     return Ok("Forgot Password");
        // }


        // [HttpPost("change-password")]
        // public IActionResult ChangePassword()
        // {
        //     return Ok("Change Password");
        // }



        // [HttpPost("verify-email")]

        // public IActionResult VerifyEmail()
        // {
        //     return Ok("Verify Email");
        // }




    }
}