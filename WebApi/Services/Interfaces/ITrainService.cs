


namespace EAD_WebService.Services.Interfaces
{
    public interface ITrainService
    {
        Task<ServiceResponse<Train>> createTrain(Train train);
        Task<ServiceResponse<Train>> getTrain(string id);
        Task<ServiceResponse<List<Train>>> getTrains();
        Task<ServiceResponse<EmptyData>> updateTrain(string id, Train trainIn);
        Task<ServiceResponse<EmptyData>> removeTrain(string id);


    }
}