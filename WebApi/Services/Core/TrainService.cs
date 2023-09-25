using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace EAD_WebService.Services.Core
{
    public class TrainService : ITrainService
    {

        private readonly IMongoCollection<Train> _train;


        public TrainService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            _train = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<Train>(mongoDBSettings.Value.TrainCollection);
        }

        public async Task<ServiceResponse<Train>> createTrain(Train train)
        {
            await _train.InsertOneAsync(train);

            return new ServiceResponse<Train>
            {
                Data = train,
                Message = "Train created successfully",
                Status = true
            };

        }

        public Task<ServiceResponse<Train>> getTrain(string id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<List<Train>>> getTrains()
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<EmptyData>> removeTrain(string id)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResponse<EmptyData>> updateTrain(string id, Train trainIn)
        {
            throw new NotImplementedException();
        }
    }
}