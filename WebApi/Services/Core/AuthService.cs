
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using EAD_WebService.Dto.Auth;
using EAD_WebService.Util;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson;
using MongoDB.Driver;


namespace EAD_WebService.Services.Core
{
    public class AuthService : IAuthService
    {

        private readonly IMongoCollection<User> _authCollection;
        private readonly IConfiguration _configuration;
        public AuthService(IOptions<MongoDBSettings> mongoDBSettings, IConfiguration configuration)
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

                if (!BCrypt.Net.BCrypt.Verify(loginUserDto.Password, user.Password)) throw new Exception("Invalid Password");

                return new ServiceResponse<LoginSuccessDto>
                {
                    Data = new LoginSuccessDto
                    {
                        Token = createToken(user),
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        AvatarUrl = user.AvatarUrl,
                        Role = user.Role
                    },
                    Message = "Login Successful",
                    Status = true

                };

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
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

                if (userExists != null) throw new Exception("User already exists");

                string hashPassword = BCrypt.Net.BCrypt.HashPassword(registerUserDto.Password);

                // // Create a unique index on the "email" field
                var emailIndexKeys = Builders<User>.IndexKeys.Ascending(u => u.Email);
                var emailIndexOptions = new CreateIndexOptions { Unique = true };
                var emailIndexModel = new CreateIndexModel<User>(emailIndexKeys, emailIndexOptions);

                // Create a unique index on the "nic" field
                var nicIndexKeys = Builders<User>.IndexKeys.Ascending(u => u.Nic);
                var nicIndexOptions = new CreateIndexOptions { Unique = true };
                var nicIndexModel = new CreateIndexModel<User>(nicIndexKeys, nicIndexOptions);

                // Create the unique indexes on the collection
                await _authCollection.Indexes.CreateOneAsync(emailIndexModel);
                await _authCollection.Indexes.CreateOneAsync(nicIndexModel);
                dynamic uploadResult = "";
                //Image Upload
                if (registerUserDto.Avatar != null)
                {

                    Cloudinary cloudinary = CloudinaryConfig.GetCloudinaryInstance();
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(registerUserDto.Avatar.FileName, registerUserDto.Avatar.OpenReadStream()),
                        UseFilename = true,
                        UniqueFilename = true,
                        Overwrite = true,
                        Folder = "EAD-Project/Avatar",
                        Transformation = new Transformation().Width(150).Height(150).Crop("fill"),


                    };
                    uploadResult = await cloudinary.UploadAsync(uploadParams);
                    Console.WriteLine(uploadResult.Url);
                }

                var user = new User
                {
                    FirstName = registerUserDto.FirstName,
                    Nic = registerUserDto.NIC,
                    LastName = registerUserDto.LastName,
                    Email = registerUserDto.Email,
                    Password = hashPassword,

                    // AvatarUrl = uploadResult.Url.ToString() ?? uploadResult,
                };

                await _authCollection.InsertOneAsync(user);


                return new ServiceResponse<LoginSuccessDto>
                {
                    Data = new LoginSuccessDto
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        AvatarUrl = user.AvatarUrl,
                        Token = createToken(user)
                    },
                    Message = "User created successfully",
                    Status = true
                };
            }
            catch (MongoWriteException ex)
            {
                Console.WriteLine(ex.Message);
                if (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
                {
                    return new ServiceResponse<LoginSuccessDto>
                    {
                        Status = false,
                        Message = "With this email or nic user already exists"
                    };
                }
                return new ServiceResponse<LoginSuccessDto>
                {
                    Status = false,
                    Message = ex.Message
                };
            }
            catch (Exception ex)
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
                new Claim(ClaimTypes.Role,user.Role),
            };

            //genrate a key for the token using Microsoft.IdentityModel.Tokens
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSetting:Token").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            //sign the key using Microsoft.IdentityModel.Tokens
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds
            );

            //return the token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}