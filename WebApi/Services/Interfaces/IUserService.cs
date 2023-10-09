


namespace EAD_WebService.Services.Interfaces
{
    public interface IUserService
    {
        Task<ServiceResponse<User>> getUser(string id);
        Task<ServiceResponse<List<User>>> getUsers(BasicFilters filters);
        Task<ServiceResponse<EmptyData>> updateUser(string id, User userIn);
        Task<ServiceResponse<EmptyData>> removeUser(string id);
        Task<ServiceResponse<EmptyData>> updateUserRole(string id, UserEnum role);
        Task<ServiceResponse<EmptyData>> activateUser(string id);

        Task<ServiceResponse<EmptyData>> deativateUser(string id);

    }
}