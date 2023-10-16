using System.Globalization;
using EAD_WebService.Dto.Reservation;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using MongoDB.Driver.Linq;


namespace EAD_WebService.Services.Core
{
    public class ReservationService : IReservationService
    {
        private readonly IMongoCollection<Reservation> _reservation;
        private readonly ITrainScheduleService _trainScheduleService;

        public ReservationService(IOptions<MongoDBSettings> mongoDBSettings, ITrainScheduleService trainScheduleService)
        {
            _trainScheduleService = trainScheduleService;
            _reservation = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<Reservation>(mongoDBSettings.Value.ReservationCollection);
        }
        public async Task<ServiceResponse<Reservation>> CreateReservation(Reservation booking)
        {
            if (booking.ReservedSeatCount > 5)
            {
                return new ServiceResponse<Reservation>
                {
                    Message = "You can only book a maximum of 5 seats",
                    Status = false
                };


            }
            booking.ReservationPrice = booking.ReservedSeatCount * booking.Ticket.TicketPrice;


            await _reservation.InsertOneAsync(booking);


            _ = await _trainScheduleService.addReservation(booking.ReservedTrainId, booking.Id, booking.Ticket.Id, booking.ReservedSeatCount);
            await _trainScheduleService.updateTicketsAvailability(booking.ReservedTrainId, booking.ReservedTrainId, booking.ReservedSeatCount);


            return new ServiceResponse<Reservation>
            {
                Message = "Booking created successfully",
                Status = true
            };
        }


        async Task<ServiceResponse<Reservation>> IReservationService.GetOneReservation(string id)
        {

            try
            {
                var Reservation = await _reservation.Find(Reservation => Reservation.Id == id).FirstOrDefaultAsync();



                return new ServiceResponse<Reservation>
                {
                    Message = "Booking retrieved successfully",
                    Status = true,
                    Data = Reservation
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<Reservation>
                {
                    Message = ex.Message,
                    Status = false
                };
            }

        }


        async Task<ServiceResponse<EmptyData>> IReservationService.RemoveReservation(string id)
        {

            try
            {

                Reservation exitsReservation = await _reservation.Find(Reservation => Reservation.Id == id).FirstOrDefaultAsync();

                if (exitsReservation == null)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Booking not found",
                        Status = false
                    };
                }
                TimeSpan difference = exitsReservation.ReservedDate - DateTime.UtcNow;
                Console.WriteLine(difference);
                if (difference.TotalDays < 5)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "You can't remove your booking if there are only 5 days or fewer left to the reservation date. ",
                        Status = false
                    };
                }


                await _reservation.DeleteOneAsync(Reservation => Reservation.Id == id);
                return new ServiceResponse<EmptyData>
                {
                    Message = "Booking deleted successfully",
                    Status = true
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = ex.Message,
                    Status = false
                };
            }

        }

        public async Task<ServiceResponse<EmptyData>> UpdateReservation(string id, Reservation reservation)
        {
            try
            {

                var isExists = await _reservation.Find(Reservation => Reservation.Id == id).AnyAsync();

                if (!isExists)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Booking not found",
                        Status = false
                    };
                }
                Console.WriteLine(reservation.Ticket.TicketType);
                Console.WriteLine(reservation.Ticket.TicketPrice);
                DateTime dateTime = DateTime.UtcNow;
                var filter = Builders<Reservation>.Filter.Eq(Reservation => Reservation.Id, id);
                var update = Builders<Reservation>.Update
                    .Set(Reservation => Reservation.ReservedDate, reservation.ReservedDate)
                    .Set(Reservation => Reservation.ReservedTrainId, reservation.ReservedTrainId)
                    .Set(Reservation => Reservation.ReservedUserId, reservation.ReservedUserId)
                    .Set(Reservation => Reservation.ReservedSeatCount, reservation.ReservedSeatCount)
                    .Set(Reservation => Reservation.Ticket, reservation.Ticket)
                    .Set(Reservation => Reservation.UpdatedAt, dateTime.Date)
                    .Set(Reservation => Reservation.ReservationPrice, reservation.Ticket.TicketPrice * reservation.ReservedSeatCount)
                    ;



                await _reservation.UpdateOneAsync(filter, update);


                return new ServiceResponse<EmptyData>
                {
                    Message = "Booking updated successfully",
                    Status = true
                };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<EmptyData>
                {
                    Message = ex.Message,
                    Status = false
                };
            }
        }

        public async Task<ServiceResponse<List<ReservationFormatedResponse>>> GetUpcomingReservation(BasicFilters filters, string userId)
        {
            try
            {

                DateTime dateTime = DateTime.UtcNow;

                var pipeline = new BsonDocument[]
                {
    new BsonDocument("$match", new BsonDocument
    {
        {
            "$and", new BsonArray
            {
                new BsonDocument("reserved_user", new ObjectId(userId)),
               new BsonDocument("reserved_date", new BsonDocument("$gte", BsonDateTime.Create(dateTime)))
            }
        }
    }),
    new BsonDocument("$lookup", new BsonDocument
    {
        { "from", "train" },
        { "localField", "reserved_train" },
        { "foreignField", "_id" },
        { "as", "train" }
    }),
    new BsonDocument("$lookup", new BsonDocument
    {
        { "from", "user" },
        { "localField", "reserved_user" },
        { "foreignField", "_id" },
        { "as", "user" }
    }),
    new BsonDocument("$unwind", "$train"),
    new BsonDocument("$unwind", "$user"),
    new BsonDocument("$project", new BsonDocument
    {
        {"_id",1},
        {"reserved_date",1},
        {"reserved_seat_count",1},
        {"reservation_price",1},
        {"created_at",1},
        {"ticket",1},
        {"user",new BsonDocument
        {
            {"_id",1},
            {"first_name",1},
            {"last_name",1}
        }},
        {
            "train",new BsonDocument
            {
                {"train_name",1},
                {"_id",1},
                {"train_number",1},
                {"train_start_time",1},
                {"end_station",1},
                {"start_station",1},
                {"train_end_time",1},
                {"departure_date",1}
            }
        }
    })
                };

                List<BsonDocument> bsonReservations = _reservation.Aggregate<BsonDocument>(pipeline).ToList();
                // foreach (BsonDocument item in bsonReservations)
                // {
                //     Console.WriteLine(item);
                // }



                List<ReservationSuceessResponse> reservations = bsonReservations.Select(bsonDoc => BsonSerializer.Deserialize<ReservationSuceessResponse>(bsonDoc)).ToList();

                List<ReservationSuceessResponse> sortedReservations = reservations.OrderBy(reservation => reservation.ReservedDate).ToList();

                List<ReservationSuceessResponse> filteredReservations = sortedReservations.Skip(filters.PageSize).Take(filters.Page).ToList();

                List<ReservationFormatedResponse> formattedTrains = reservations.Select(item => new ReservationFormatedResponse
                {
                    CreatedAt = item.CreatedAt.ToString("yyyy-MM-dd"),
                    Id = item.Id,
                    IsActive = item.IsActive,
                    ReservedDate = item.ReservedDate.ToString("yyyy-MM-dd"),
                    ReservedSeatCount = item.ReservedSeatCount,
                    ReservationPrice = item.ReservationPrice,
                    Ticket = item.Ticket,
                    trainResponse = new TrainDtoResponse
                    {
                        DepartureDate = item.trainResponse.DepartureDate.ToString("yyyy-MM-dd"),
                        EndStation = item.trainResponse.EndStation,
                        Id = item.trainResponse.Id,
                        StartStation = item.trainResponse.StartStation,
                        TrainEndTime = item.trainResponse.TrainEndTime.ToString("HH:mm tt"),
                        TrainName = item.trainResponse.TrainName,
                        TrainNumber = item.trainResponse.TrainNumber,
                        TrainStartTime = item.trainResponse.TrainStartTime.ToString("HH:mm tt")
                    },
                    userResponse = new UserDtoResponse
                    {
                        Id = item.userResponse.Id,
                        FirstName = item.userResponse.FirstName,
                        LastName = item.userResponse.LastName
                    }
                }).ToList();

                return new ServiceResponse<List<ReservationFormatedResponse>>
                {
                    Message = "Booking retrieved successfully",
                    Status = true,
                    Data = formattedTrains
                };

            }
            catch (Exception ex)
            {

                return new ServiceResponse<List<ReservationFormatedResponse>>
                {
                    Message = ex.Message,
                    Status = false
                };

            }


        }

        public async Task<ServiceResponse<List<ReservationFormatedResponse>>> GetPastReservation(BasicFilters filters, string userId)
        {
            try
            {

                DateTime dateTime = DateTime.UtcNow;


                Console.WriteLine(BsonDateTime.Create(dateTime.Date));

                var pipeline = new BsonDocument[]
                {
                            new BsonDocument("$match", new BsonDocument
                            {
                                {
                                    "$and", new BsonArray
                                    {
                                        new BsonDocument("reserved_user", new ObjectId(userId)),
                                    new BsonDocument("reserved_date", new BsonDocument("$lt", BsonDateTime.Create(dateTime.Date.AddHours(-1))))
                                    }
                                }
                            }),
                            new BsonDocument("$lookup", new BsonDocument
                            {
                                { "from", "train" },
                                { "localField", "reserved_train" },
                                { "foreignField", "_id" },
                                { "as", "train" }
                            }),
                            new BsonDocument("$lookup", new BsonDocument
                            {
                                { "from", "user" },
                                { "localField", "reserved_user" },
                                { "foreignField", "_id" },
                                { "as", "user" }
                            }),
                            new BsonDocument("$unwind", "$train"),
                            new BsonDocument("$unwind", "$user"),
                            new BsonDocument("$project", new BsonDocument
                            {
                                {"_id",1},
                                {"reserved_date",1},
                                {"reserved_seat_count",1},
                                {"reservation_price",1},
                                {"created_at",1},
                                {"ticket",1},
                                {"user",new BsonDocument
                                {
                                    {"_id",1},
                                    {"first_name",1},
                                    {"last_name",1}
                                }},
                                {
                                    "train",new BsonDocument
                                    {
                                        {"train_name",1},
                                        {"_id",1},
                                        {"train_number",1},
                                        {"train_start_time",1},
                                        {"end_station",1},
                                        {"start_station",1},
                                        {"train_end_time",1},
                                        {"departure_date",1}
                                    }
                                }
                            })
                                        };

                List<BsonDocument> bsonReservations = _reservation.Aggregate<BsonDocument>(pipeline).ToList();
                List<ReservationSuceessResponse> reservations = bsonReservations.Select(bsonDoc => BsonSerializer.Deserialize<ReservationSuceessResponse>(bsonDoc)).ToList();

                List<ReservationSuceessResponse> sortedReservations = reservations.OrderBy(reservation => reservation.ReservedDate).ToList();

                List<ReservationSuceessResponse> filteredReservations = sortedReservations.Skip(filters.PageSize).Take(filters.Page).ToList();

                List<ReservationFormatedResponse> formattedTrains = reservations.Select(item => new ReservationFormatedResponse
                {
                    CreatedAt = item.CreatedAt.ToString("yyyy-MM-dd"),
                    Id = item.Id,
                    IsActive = item.IsActive,
                    ReservedDate = item.ReservedDate.ToString("yyyy-MM-dd"),
                    ReservedSeatCount = item.ReservedSeatCount,
                    ReservationPrice = item.ReservationPrice,
                    Ticket = item.Ticket,
                    trainResponse = new TrainDtoResponse
                    {
                        DepartureDate = item.trainResponse.DepartureDate.ToString("yyyy-MM-dd"),
                        EndStation = item.trainResponse.EndStation,
                        Id = item.trainResponse.Id,
                        StartStation = item.trainResponse.StartStation,
                        TrainEndTime = item.trainResponse.TrainEndTime.ToString("HH:mm tt"),
                        TrainName = item.trainResponse.TrainName,
                        TrainNumber = item.trainResponse.TrainNumber,
                        TrainStartTime = item.trainResponse.TrainStartTime.ToString("HH:mm tt")
                    },
                    userResponse = new UserDtoResponse
                    {
                        Id = item.userResponse.Id,
                        FirstName = item.userResponse.FirstName,
                        LastName = item.userResponse.LastName
                    }
                }).ToList();

                return new ServiceResponse<List<ReservationFormatedResponse>>
                {
                    Message = "Booking retrieved successfully",
                    Status = true,
                    Data = formattedTrains
                };
            }
            catch (Exception ex)
            {


                return new ServiceResponse<List<ReservationFormatedResponse>>
                {
                    Message = ex.Message,
                    Status = false
                };

            }


        }

        async public Task<ServiceResponse<List<ReservationFormatedResponse>>> GetAllReservation(BasicFilters filters)
        {
            try
            {




                var pipeline = new BsonDocument[]
                {
                            new BsonDocument("$lookup", new BsonDocument
                            {
                                { "from", "train" },
                                { "localField", "reserved_train" },
                                { "foreignField", "_id" },
                                { "as", "train" }
                            }),
                            new BsonDocument("$lookup", new BsonDocument
                            {
                                { "from", "user" },
                                { "localField", "reserved_user" },
                                { "foreignField", "_id" },
                                { "as", "user" }
                            }),
                            new BsonDocument("$unwind", "$train"),
                            new BsonDocument("$unwind", "$user"),
                            new BsonDocument("$project", new BsonDocument
                            {
                                {"_id",1},
                                {"reserved_date",1},
                                {"reserved_seat_count",1},
                                {"reservation_price",1},
                                {"created_at",1},
                                {"ticket",1},
                                {"user",new BsonDocument
                                {
                                    {"_id",1},
                                    {"first_name",1},
                                    {"last_name",1}
                                }},
                                {
                                    "train",new BsonDocument
                                    {
                                        {"train_name",1},
                                        {"_id",1},
                                        {"train_number",1},
                                        {"train_start_time",1},
                                        {"end_station",1},
                                        {"start_station",1},
                                        {"train_end_time",1},
                                        {"departure_date",1}
                                    }
                                }
                            })
                                        };

                List<BsonDocument> bsonReservations = _reservation.Aggregate<BsonDocument>(pipeline).ToList();
                List<ReservationSuceessResponse> reservations = bsonReservations.Select(bsonDoc => BsonSerializer.Deserialize<ReservationSuceessResponse>(bsonDoc)).ToList();

                List<ReservationFormatedResponse> formattedTrains = reservations.Select(item => new ReservationFormatedResponse
                {
                    CreatedAt = item.CreatedAt.ToString("yyyy-MM-dd"),
                    Id = item.Id,
                    IsActive = item.IsActive,
                    ReservedDate = item.ReservedDate.ToString("yyyy-MM-dd"),
                    ReservedSeatCount = item.ReservedSeatCount,
                    ReservationPrice = item.ReservationPrice,
                    Ticket = item.Ticket,
                    trainResponse = new TrainDtoResponse
                    {
                        DepartureDate = item.trainResponse.DepartureDate.ToString("yyyy-MM-dd"),
                        EndStation = item.trainResponse.EndStation,
                        Id = item.trainResponse.Id,
                        StartStation = item.trainResponse.StartStation,
                        TrainEndTime = item.trainResponse.TrainEndTime.ToString("HH:mm tt"),
                        TrainName = item.trainResponse.TrainName,
                        TrainNumber = item.trainResponse.TrainNumber,
                        TrainStartTime = item.trainResponse.TrainStartTime.ToString("HH:mm tt")
                    },
                    userResponse = new UserDtoResponse
                    {
                        Id = item.userResponse.Id,
                        FirstName = item.userResponse.FirstName,
                        LastName = item.userResponse.LastName
                    }
                }).ToList();

                return new ServiceResponse<List<ReservationFormatedResponse>>
                {
                    Message = "Booking retrieved successfully",
                    Status = true,
                    Data = formattedTrains
                };
            }
            catch (Exception ex)
            {


                return new ServiceResponse<List<ReservationFormatedResponse>>
                {
                    Message = ex.Message,
                    Status = false
                };

            }
        }
    }
}