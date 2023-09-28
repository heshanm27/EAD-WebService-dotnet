using Microsoft.Extensions.Options;
using MongoDB.Bson;
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

        public async Task<ServiceResponse<Train>> getTrain(string id)
        {

            try
            {
                var train = await _train.Find(Train => Train.Id == new ObjectId(id)).FirstOrDefaultAsync();

                return new ServiceResponse<Train>
                {
                    Message = "Train retrieved successfully",
                    Status = true,
                    Data = train
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<Train>
                {
                    Message = "Train not found",
                    Status = false,
                    Data = null
                };
            }
        }

        public async Task<ServiceResponse<List<Train>>> getTrains()
        {

            try
            {
                await _train.Find(Train => true).ToListAsync();

                return new ServiceResponse<List<Train>>
                {
                    Message = "Trains retrieved successfully",
                    Status = true,
                    Data = await _train.Find(Train => true).ToListAsync()
                };
            }
            catch (MongoException)
            {
                return new ServiceResponse<List<Train>>
                {
                    Data = null,
                    Message = "Train retrive failed",
                    Status = false
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<List<Train>>
                {
                    Message = e.Message,
                    Status = false,
                    Data = null
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> removeTrain(string id)
        {

            try
            {
                await _train.DeleteOneAsync(Train => Train.Id == new ObjectId(id));

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train deleted successfully",
                    Status = true
                };
            }
            catch (MongoException)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train deleteion faild",
                    Status = false
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = e.Message,
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> updateTrain(string id, Train trainIn)
        {
            try
            {
                var filter = Builders<Train>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<Train>.Update
                               .Set("train_name", trainIn.TrainName)
                               .Set("train_type", trainIn.TrainType)
                              .Set("train_route", trainIn.TrainRoute)
                              .Set("train_start", trainIn.TrainStart)
                              .Set("train_end", trainIn.TrainEnd)
                              .Set("train_start_time", trainIn.TrainStartTime)
                              .Set("train_end_time", trainIn.TrainEndTime)
                              .Set("train_start_date", trainIn.TrainStartDate)
                              .Set("train_ticket_prices", trainIn.TrainTicketPrices);

                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train updated successfully",
                    Status = true
                };


            }
            catch (MongoException)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train not found",
                    Status = false
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = e.Message,
                    Status = false
                };
            }
        }
    }
}