

namespace EAD_WebService.Dto.Auth
{
    public class LoginSuccessDto
    {
        public string Token { get; set; } = null!;

        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string AvatarUrl { get; set; } = string.Empty;

        public string Role { get; set; } = null!;


    }
}