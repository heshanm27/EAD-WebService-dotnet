


namespace EAD_WebService.Services.Interfaces
{
    public interface IUserService
    {
        User registerUser(User user);
        User getUser(string id);
        List<User> getUsers();
        void updateUser(string id, User userIn);
        void removeUser(string id);
        
    }
}