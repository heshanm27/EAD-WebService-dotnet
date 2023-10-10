using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

/*
    File: UserServices.cs
    Author:
    Description: This file is used to store the logic related to user management.
 */

namespace EAD_WebService.Services.Core
{
    public class UserService : IUserService
    {

        private readonly IMongoCollection<User> _user;

        public UserService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            _user = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<User>(mongoDBSettings.Value.UserCollection);
        }

        //This mathod is used to handle the business logic when getting the user information

        public async Task<ServiceResponse<User>> getUser(string id)
        {
            try
            {
                var user = await _user.Find<User>(user => user.Id == id).FirstOrDefaultAsync();
                return new ServiceResponse<User>
                {
                    Data = user,
                    Message = "User found",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<User>
                {
                    Message = "User not found",
                    Status = false
                };
            }
        }

        //This method is used to handle the business logic when getting all uesr data
        public async Task<ServiceResponse<List<User>>> getUsers(BasicFilters filters)
        {
            try
            {
                var users = await _user.FindAsync<User>(user => true).Result.ToListAsync();
                return new ServiceResponse<List<User>>
                {
                    Data = users,
                    Message = "Users found",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<List<User>>
                {
                    Message = "Users not found",
                    Status = false
                };
            }
        }

        //This method is used to handle the business logic when deleting a user

        public async Task<ServiceResponse<EmptyData>> removeUser(string id)
        {
            try
            {
                await _user.DeleteOneAsync(user => user.Id == id);
                return new ServiceResponse<EmptyData>
                {
                    Message = "User deleted",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "User not found",
                    Status = false
                };
            }
        }

        //This method is used to handle the business logic when updating a user
        public async Task<ServiceResponse<EmptyData>> updateUser(string id, User userIn)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<User>.Update.Set("email", userIn.Email).Set("nic", userIn.Nic).Set("first_name", userIn.FirstName).Set("last_name", userIn.LastName).Set("avatar_url", userIn.AvatarUrl);

                await _user.UpdateOneAsync(filter, update);
                return new ServiceResponse<EmptyData>
                {
                    Message = "User updated",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "User not found",
                    Status = false
                };
            }
        }

        //This method is used to handle the business logic when activating a user
        public async Task<ServiceResponse<EmptyData>> activateUser(string id)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<User>.Update.Set("is_active", true);

                await _user.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "User activate successfuly",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "User activate unsuccessful",
                    Status = false
                };
            }
        }

        //This method is used to handle the business logic when de-activating a user
        public async Task<ServiceResponse<EmptyData>> deativateUser(string id)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<User>.Update.Set("is_active", true);

                await _user.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "User deactivate successfuly",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "User deactivate unsuccessful",
                    Status = false
                };
            }
        }

        //This method is used to handle the business logic when updating a user role
        public async Task<ServiceResponse<EmptyData>> updateUserRole(string id, UserEnum role)
        {
            try
            {
                var filter = Builders<User>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<User>.Update.Set("role", role);

                await _user.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "User role updated successfuly",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "User role update unsuccessful",
                    Status = false
                };
            }
        }
    }
}