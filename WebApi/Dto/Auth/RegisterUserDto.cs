
using System.ComponentModel.DataAnnotations;

namespace EAD_WebService.Dto.Auth
{
    public class RegisterUserDto
    {

        [Required(ErrorMessage = "NIC is required")]
        public string NIC { get; set; } = null!;

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; } = null!;

        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; } = null!;

        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = null!;

    }
}