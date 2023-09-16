using EAD_WebService.Services.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace EAD_WebService.Services.Core
{
    public class TrainService : ITrainService
    {

        private readonly IMongoCollection<Train> _train;


        public TrainService(IOptions<MongoDBSettings> mongoDBSettings )
        {
            _train = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<Train>(mongoDBSettings.Value.TrainCollection);
        }
        public Train createTrain(Train train)
        {
            throw new NotImplementedException();
        }

        public Train getTrain(string id)
        {
            throw new NotImplementedException();
        }

        public List<Train> getTrains()
        {
            throw new NotImplementedException();
        }

        public void removeTrain(string id)
        {
            throw new NotImplementedException();
        }

        public void updateTrain(string id, Train trainIn)
        {
            throw new NotImplementedException();
        }
    }
}