using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EAD_WebService.Dto.Auth;
using Microsoft.AspNetCore.Mvc;

/*
    File: IAuthService.cs
    Author:
    Description: This is the custom interface for handling user authentication.
*/


namespace EAD_WebService.Services.Interfaces
{
    public interface IAuthService
    {
        Task<ServiceResponse<LoginSuccessDto>> registerUser(RegisterUserDto registerUserDto);

        Task<ServiceResponse<LoginSuccessDto>> loginUser(LoginUserDto loginUserDto);

        void forgotPassword(User user);

        void changePassword(User user);

        string createToken(User user);

    }
}