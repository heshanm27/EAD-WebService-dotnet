using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;


namespace EAD_WebService.Services.Core
{
    public class TrainScheduleService : ITrainScheduleService
    {

        private readonly IMongoCollection<Train> _train;


        public TrainScheduleService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            _train = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<Train>(mongoDBSettings.Value.TrainCollection);
        }

        public async Task<ServiceResponse<Train>> createTrainSchedule(Train train)
        {
            await _train.InsertOneAsync(train);

            return new ServiceResponse<Train>
            {
                Data = train,
                Message = "Train schedule created successfully",
                Status = true
            };

        }

        public async Task<ServiceResponse<Train>> getTrainSchedule(string id)
        {

            try
            {
                var train = await _train.Find(Train => Train.Id == new ObjectId(id)).FirstOrDefaultAsync();

                if (train == null)
                {
                    return new ServiceResponse<Train>
                    {
                        Message = "Train schedule not found",
                        Status = false,
                        Data = null
                    };
                }

                return new ServiceResponse<Train>
                {
                    Message = "Train schedules retrieved successfully",
                    Status = true,
                    Data = train
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<Train>
                {
                    Message = "Train schedule not found",
                    Status = false,
                    Data = null
                };
            }
        }

        public async Task<ServiceResponse<List<Train>>> getTrainSchedule()
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

        public async Task<ServiceResponse<EmptyData>> removeTrainSchedule(string id)
        {
            try
            {
                var train = await _train.FindAsync(Train => Train.Id == new ObjectId(id));

                if (train == null)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train not found",
                        Status = false
                    };
                }

                //count if there is reservations for this train
                var reservationCount = train.FirstOrDefault().Reservations.Count;

                if (reservationCount == 0)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train schedule can not be deleted because there are reservations for this train schedule",
                        Status = false
                    };
                }

                await _train.DeleteOneAsync(Train => Train.Id == new ObjectId(id));

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule deleted successfully",
                    Status = true
                };
            }
            catch (MongoException)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule deleteion faild",
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

        public async Task<ServiceResponse<EmptyData>> updateTrainSchedule(string id, Train trainIn)


        {
            try
            {

                var train = await _train.FindAsync(Train => Train.Id == new ObjectId(id));

                if (train == null)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train not found",
                        Status = false
                    };
                }

                //count if there is reservations for this train
                var reservationCount = train.FirstOrDefault().Reservations.Count;

                if (reservationCount == 0)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train schedule can not be updated because there are reservations for this train schedule",
                        Status = false
                    };
                }
                var filter = Builders<Train>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<Train>.Update
                               .Set("train_name", trainIn.TrainName)
                               .Set("train_number", trainIn.TrainNumber)
                                .Set("start_station", trainIn.StartStation)
                                .Set("end_station", trainIn.EndStation)
                              .Set("train_start_time", trainIn.TrainStartTime)
                              .Set("train_end_time", trainIn.TrainEndTime)
                              .Set("departure_date", trainIn.DepartureDate);


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
                    Message = "Train shedule update faild",
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

        public async Task<bool> addReservation(string trainId, string reservationId)
        {
            try
            {
                var filter = Builders<Train>.Filter.Eq(Train => Train.Id, new ObjectId(trainId));
                var update = Builders<Train>.Update.Push(Train => Train.Reservations, new ObjectId(reservationId));

                await _train.UpdateOneAsync(filter, update);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> removeReservation(string trainId, string reservationId)
        {
            try
            {
                var filter = Builders<Train>.Filter.Eq(Train => Train.Id, new ObjectId(trainId));
                var update = Builders<Train>.Update.Pull(Train => Train.Reservations, new ObjectId(reservationId));


                await _train.UpdateOneAsync(filter, update);

                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<ServiceResponse<EmptyData>> publishTrainSchedule(string id)
        {
            try
            {
                var train = await _train.FindAsync(Train => Train.Id == new ObjectId(id));

                if (train == null)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train schedule not found",
                        Status = false
                    };
                }

                var filter = Builders<Train>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<Train>.Update
                               .Set("isPublished", true);


                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule published successfully",
                    Status = true

                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule publish faild",
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> unpublishTrainSchedule(string id)
        {
            try
            {
                var train = await _train.FindAsync(Train => Train.Id == new ObjectId(id));

                if (train == null)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train schedule not found",
                        Status = false
                    };
                }

                var filter = Builders<Train>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<Train>.Update
                               .Set("isPublished", false);


                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule published successfully",
                    Status = true

                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule publish faild",
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> addTickets(string id, List<Tickets> tickets)
        {

            try
            {
                // neeed to genrate new Tickets object list with new object id

                var ticketsList = new List<Tickets>();
                foreach (var ticket in tickets)
                {
                    var newTicket = new Tickets
                    {
                        Id = ObjectId.GenerateNewId(),
                        TicketPrice = ticket.TicketPrice,
                        TicketCount = ticket.TicketCount,
                        TicketType = ticket.TicketType
                    };
                    ticketsList.Add(newTicket);
                }


                await _train.FindOneAndUpdateAsync(Train => Train.Id == new ObjectId(id), Builders<Train>.Update.PushEach(Train => Train.Tickets, ticketsList));


                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule published successfully",
                    Status = true

                };
            }
            catch (MongoException)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule publish faild",
                    Status = false
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule publish faild",
                    Status = false
                };
            }




        }

        public async Task<ServiceResponse<EmptyData>> removeTickets(string trainid, string ticketsId)
        {

            try
            {
                var filter = Builders<Train>.Filter.Eq(Train => Train.Id, new ObjectId(trainid));
                var update = Builders<Train>.Update.PullFilter(Train => Train.Tickets, Builders<Tickets>.Filter.Eq(Tickets => Tickets.Id, new ObjectId(ticketsId)));

                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule published successfully",
                    Status = true

                };
            }
            catch (MongoException)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule publish faild",
                    Status = false
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule publish faild",
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> updateTickets(string trainid, string ticketsId, Tickets ticketsIn)
        {
            try
            {
                // Get the ticket object from the train schedule and update it
                var filter = Builders<Train>.Filter.And(
                Builders<Train>.Filter.Eq("Id", new ObjectId(trainid)),
                Builders<Train>.Filter.ElemMatch("tickets", Builders<Tickets>.Filter.Eq("Id", new ObjectId(ticketsId)))
            );

                var update = Builders<Train>.Update
                    .Set("Tickets.$.TicketPrice", ticketsIn.TicketPrice)
                    .Set("Tickets.$.TicketCount", ticketsIn.TicketCount)
                    .Set("Tickets.$.TicketType", ticketsIn.TicketType);

                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule published successfully",
                    Status = true

                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule publish faild",
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> activateTrainSchedule(string id)
        {
            try
            {
                var train = await _train.FindAsync(Train => Train.Id == new ObjectId(id));

                if (train == null)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train schedule not found",
                        Status = false
                    };
                }

                var filter = Builders<Train>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<Train>.Update
                               .Set("isActive", true);


                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule activate successfully",
                    Status = true

                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule activate faild",
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> deactivateTrainSchedule(string id)
        {
            try
            {
                var train = await _train.FindAsync(Train => Train.Id == new ObjectId(id));

                if (train == null)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train schedule not found",
                        Status = false
                    };
                }

                var filter = Builders<Train>.Filter.Eq("Id", new ObjectId(id));
                var update = Builders<Train>.Update
                               .Set("isActive", false);


                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Train schedule deactivate successfully",
                    Status = true

                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train shedule deactivate faild",
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> updateTicketsAvailability(string trainid, string ticketsId, int count)
        {
            try
            {
                // Get the main schedule object from the database
                var filter = Builders<Train>.Filter.Eq("_id", new ObjectId(trainid));
                var trainSchedule = await _train.Find(filter).FirstOrDefaultAsync();

                // Find the specific ticket object in the Tickets array
                var ticket = trainSchedule.Tickets.Find(t => t.Id == new ObjectId(ticketsId));

                // Update booked ticket count
                if (ticket != null)
                {
                    // Update the booked_count property of the specific ticket
                    ticket.TicketBooked = ticket.TicketBooked + count;

                    // Save the changes back to the database
                    var updateFilter = Builders<Train>.Filter.Eq("_id", trainSchedule.Id);
                    var updateDefinition = Builders<Train>.Update.Set("Tickets", trainSchedule.Tickets);
                    await _train.UpdateOneAsync(updateFilter, updateDefinition);
                }

                return new ServiceResponse<EmptyData>
                {
                    Message = "Booked ticket count updated successfully",
                    Status = true
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Failed to update booked ticket count",
                    Status = false
                };
            }
        }
    }
}