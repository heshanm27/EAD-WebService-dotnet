
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EAD_WebService.Dto.Auth;
using EAD_WebService.Services.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;


namespace EAD_WebService.Services.Core
{
    public class AuthService : IAuthService
    {

        private readonly IMongoCollection<User> _authCollection;
        private readonly IConfiguration _configuration;
        
        public AuthService(IOptions<MongoDBSettings> mongoDBSettings,IConfiguration configuration)
        {
            _configuration = configuration;
             _authCollection = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<User>(mongoDBSettings.Value.UserCollection);
        }

        public async Task<ServiceResponse<LoginSuccessDto>> loginUser(LoginUserDto loginUserDto)
        {
            try
            {
                var user = await _authCollection.Find(u => u.Email == loginUserDto.Email).FirstOrDefaultAsync();

                if (user == null) throw new Exception("User does not exist");

                if (!BCrypt.Net.BCrypt.Verify(loginUserDto.Password,user.Password)) throw new Exception("Invalid Password");

                return new ServiceResponse<LoginSuccessDto>
                {
                    Data = new LoginSuccessDto
                    {
                        Token =  createToken(user),
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        AvatarUrl = user.AvatarUrl
                    },
                    Message = "Login Successful",
                    Status = true

                };

            }catch(Exception ex)
            {
                return new ServiceResponse<LoginSuccessDto>
                {
                    Status = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<ServiceResponse<LoginSuccessDto>> registerUser(RegisterUserDto registerUserDto)
        {

            try
            {

                var userExists = await _authCollection.Find(u => u.Email == registerUserDto.Email).FirstOrDefaultAsync();

                if(userExists != null) throw new Exception("User already exists");

                string hashPassword = BCrypt.Net.BCrypt.HashPassword(registerUserDto.Password);

                var user = new User
                {
                    FirstName = registerUserDto.FirstName,
                    LastName = registerUserDto.LastName,
                    Email = registerUserDto.Email,
                    Password = hashPassword,
                };


                await _authCollection.InsertOneAsync(user);


                return new ServiceResponse<LoginSuccessDto>
                {
                    Data= new LoginSuccessDto{
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        AvatarUrl = user.AvatarUrl,
                        Token = createToken(user)
                    },
                    Message = "User created successfully",
                    Status = true
                };
            }catch(Exception ex)
            {
                return new ServiceResponse<LoginSuccessDto>
                {
                    Status = false,
                    Message = ex.Message
                };
            }
             
        }


        public void changePassword(User user)
        {
            throw new NotImplementedException();
        }

        public void forgotPassword(User user)
        {
            throw new NotImplementedException();
        }

        public string createToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Role,user.Role)
            };

            //genrate a key for the token using Microsoft.IdentityModel.Tokens
             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value!));

            //sign the key using Microsoft.IdentityModel.Tokens
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature)
            );

            //return the token
            return  new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}