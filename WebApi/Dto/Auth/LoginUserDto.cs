using System.ComponentModel.DataAnnotations;


namespace EAD_WebService.Dto.Auth
{
    public class LoginUserDto
    {

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;
    }
}