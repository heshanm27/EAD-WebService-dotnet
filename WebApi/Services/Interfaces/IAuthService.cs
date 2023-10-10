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

        //register user service  method
        Task<ServiceResponse<LoginSuccessDto>> registerUser(RegisterUserDto registerUserDto);
        //login user service method
        Task<ServiceResponse<LoginSuccessDto>> loginUser(LoginUserDto loginUserDto);
        //forgot user service method
        void forgotPassword(User user);
        //change password service method
        void changePassword(User user);
        //create token service method
        string createToken(User user);

    }
}