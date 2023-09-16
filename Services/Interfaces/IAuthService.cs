using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_WebService.Services.Interfaces
{
    public interface IAuthService
    {
        User registerUser(User user);

        void loginUser(User user);

        void forgotPassword(User user);

        void changePassword(User user);

    }
}