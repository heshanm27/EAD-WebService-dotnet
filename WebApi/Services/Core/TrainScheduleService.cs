using System.Globalization;
using System.Reflection.Metadata;
using EAD_WebService.Dto.Train;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Converters;


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
                var train = await _train.Find(Train => Train.Id == id).FirstOrDefaultAsync();

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

        public async Task<ServiceResponse<List<TrainGetReponseDto>>> getTrainSchedule(TrainFilters filters)
        {

            try
            {
                // var trains = await _train.Find(Train => true).ToListAsync();


                // return new ServiceResponse<List<Train>>
                // {
                //     Message = "Trains retrieved successfully",
                //     Status = true,
                //     Data = trains
                // };
                DateTime ReservationDate = DateTime.Parse(filters.date);
                // ReservationDate = ReservationDate.AddHours(5).AddMinutes(30);

                // DateTime SriLankanUtcDate = new DateTime(ReservationDate.Ticks, DateTimeKind.Utc).AddHours(5).AddMinutes(30);
                Console.WriteLine(new BsonDateTime(ReservationDate.AddHours(5).AddMinutes(30)));

                var filter = Builders<Train>.Filter.AnyEq("start_station", filters.start)
                & Builders<Train>.Filter.AnyEq("end_station", filters.end)
                & Builders<Train>.Filter.Eq("departure_date", new BsonDateTime(ReservationDate.AddHours(5).AddMinutes(30)))
                ;
                // & Builders<Train>.Filter.Lte("departure_date", new BsonDateTime(ReservationDate))
                ;
                var sort = Builders<Train>.Sort.Descending("train_start_time");

                Console.WriteLine(filter);
                if (filters.Order == "asc")
                {
                    sort = Builders<Train>.Sort.Ascending(filters.Order);
                }
                var trains = await _train.Find(filter).Sort(sort).Skip((filters.Page - 1) * filters.PageSize).Limit(filters.PageSize).ToListAsync();

                List<TrainGetReponseDto> formattedTrains = trains.Select(train => new TrainGetReponseDto
                {
                    Id = train.Id,
                    TrainName = train.TrainName,
                    TrainNumber = train.TrainNumber,
                    StartStation = train.StartStation,
                    EndStation = train.EndStation,
                    DepartureDate = train.DepartureDate.ToString("yyyy-MM-dd"),
                    TrainStartTime = train.TrainStartTime.ToString("HH:mm tt"),
                    TrainEndTime = train.TrainEndTime.ToString("HH:mm tt"),
                    Tickets = train.Tickets,
                    Reservations = train.Reservations,
                    IsActive = train.IsActive,
                    IsPublished = train.IsPublished,


                    // ... other properties
                }).ToList();

                return new ServiceResponse<List<TrainGetReponseDto>>
                {
                    Message = "Trains retrieved successfully",
                    Status = true,
                    Data = formattedTrains
                };

            }
            catch (MongoException)
            {
                return new ServiceResponse<List<TrainGetReponseDto>>
                {
                    Data = null,
                    Message = "Train retrive failed",
                    Status = false
                };
            }
            catch (Exception e)
            {
                return new ServiceResponse<List<TrainGetReponseDto>>
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
                var train = await _train.FindAsync(Train => Train.Id == id);

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

                if (reservationCount != 0)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Train schedule can not be deleted because there are reservations for this train schedule",
                        Status = false
                    };
                }

                await _train.DeleteOneAsync(Train => Train.Id == id);

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

                var train = await _train.FindAsync(Train => Train.Id == id);

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

                if (reservationCount != 0)
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
                              .Set("departure_date", trainIn.DepartureDate)
                              .Set("updated_at", DateTime.UtcNow.AddHours(5).AddMinutes(30));


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
                var filter = Builders<Train>.Filter.Eq(Train => Train.Id, trainId);
                var update = Builders<Train>.Update.Push(Train => Train.Reservations, reservationId);

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
                var filter = Builders<Train>.Filter.Eq(Train => Train.Id, trainId);
                var update = Builders<Train>.Update.Pull(Train => Train.Reservations, reservationId);


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
                var train = await _train.FindAsync(Train => Train.Id == id);

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
                               .Set("isPublished", true)
                                 .Set("updated_at", DateTime.UtcNow);
                ;


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
                var train = await _train.FindAsync(Train => Train.Id == id);

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
                               .Set("isPublished", false).Set("updated_at", DateTime.UtcNow);


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
                        Id = ObjectId.GenerateNewId().ToString(),
                        TicketPrice = ticket.TicketPrice,
                        TicketCount = ticket.TicketCount,
                        TicketType = ticket.TicketType
                    };
                    ticketsList.Add(newTicket);
                }


                await _train.FindOneAndUpdateAsync(Train => Train.Id == id, Builders<Train>.Update.PushEach(Train => Train.Tickets, ticketsList));


                return new ServiceResponse<EmptyData>
                {
                    Message = "Train ticket added successfully",
                    Status = true

                };
            }
            catch (MongoException)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train ticket addition faild",
                    Status = false
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Train ticket addition faild",
                    Status = false
                };
            }




        }

        public async Task<ServiceResponse<EmptyData>> removeTickets(string trainid, string ticketsId)
        {

            try
            {
                var filter = Builders<Train>.Filter.Eq(Train => Train.Id, trainid);
                var update = Builders<Train>.Update.PullFilter(Train => Train.Tickets, Builders<Tickets>.Filter.Eq(Tickets => Tickets.Id, ticketsId));

                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Ticket type removed successfully",
                    Status = true

                };
            }
            catch (MongoException)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Ticket type removed  faild",
                    Status = false
                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Ticket type removed faild",
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
                    .Set("Tickets.$.TicketType", ticketsIn.TicketType)
                      .Set("updated_at", DateTime.UtcNow);

                await _train.UpdateOneAsync(filter, update);

                return new ServiceResponse<EmptyData>
                {
                    Message = "Ticket type update successfully",
                    Status = true

                };
            }
            catch (Exception)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = "Ticket type update faild",
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<EmptyData>> activateTrainSchedule(string id)
        {
            try
            {
                var train = await _train.FindAsync(Train => Train.Id == id);

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
                var train = await _train.FindAsync(Train => Train.Id == id);

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
                var ticket = trainSchedule.Tickets.Find(t => t.Id == ticketsId);

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