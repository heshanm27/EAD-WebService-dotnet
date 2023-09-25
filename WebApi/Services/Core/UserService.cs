using Microsoft.Extensions.Options;
using MongoDB.Driver;


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

        public User getUser(string id)
        {
            throw new NotImplementedException();
        }

        public List<User> getUsers()
        {
            throw new NotImplementedException();
        }


        public void removeUser(string id)
        {
            throw new NotImplementedException();
        }

        public void updateUser(string id, User userIn)
        {
            throw new NotImplementedException();
        }
    }
}