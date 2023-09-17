
using EAD_WebService.Dto.Auth;
using EAD_WebService.Services.Interfaces;


namespace EAD_WebService.Services.Core
{
    public class AuthService : IAuthService
    {


        public Task<ServiceResponse<LoginSuccessDto>> loginUser(LoginUserDto loginUserDto)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<LoginSuccessDto>> registerUser(RegisterUserDto registerUserDto)
        {
            throw new NotImplementedException();
        }


        public void changePassword(User user)
        {
            throw new NotImplementedException();
        }

        public void forgotPassword(User user)
        {
            throw new NotImplementedException();
        }

      
    }
}