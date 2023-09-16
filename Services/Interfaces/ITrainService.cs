


namespace EAD_WebService.Services.Interfaces
{
    public interface ITrainService
    {
        Train createTrain(Train train);
        Train getTrain(string id);
        List<Train> getTrains();
        void updateTrain(string id, Train trainIn);
        void removeTrain(string id);
        

    }
}