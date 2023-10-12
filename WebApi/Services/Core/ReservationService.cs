using EAD_WebService.Dto.Reservation;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;


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


            await _reservation.InsertOneAsync(booking);


            await _trainScheduleService.addReservation(booking.ReservedTrainId, booking.Id);
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

        [Obsolete]
        async Task<ServiceResponse<List<Reservation>>> IReservationService.GetReservation(BasicFilters filters, string userId)
        {
            try
            {

                // BsonDocument train = new BsonDocument
                //             {
                //                 { "$lookup", new BsonDocument
                //                     {
                //                         { "from", "trains" },
                //                         { "localField", "reservedTrainId" },
                //                         { "foreignField", "_id" },
                //                         { "as", "train" }
                //                     }
                //                 }
                //             };



                BsonDocument pipLineStage1 = new BsonDocument{
                    { "$match", new BsonDocument
                        {
                            { "reserved_user",new ObjectId("6523c287436b168fdcc86244") }
                        }
                    }
                };

                BsonDocument piplineStage2 = new BsonDocument{
                    { "$lookup", new BsonDocument
                        {
                            { "from", "train" },
                            { "localField", "reserved_train" },
                            { "foreignField", "_id" },
                            { "as", "train" }
                        }
                    }
                };
                BsonDocument piplineStage3 = new BsonDocument{
                    { "$lookup", new BsonDocument
                        {
                            { "from", "user" },
                            { "localField", "reserved_user" },
                            { "foreignField", "_id" },
                            { "as", "user" }
                        }
                    }
                };
                BsonDocument piplineStage4 = new BsonDocument {
                    { "$unwind", "$train" },

                   };
                BsonDocument piplineStage5 = new BsonDocument {
                    { "$unwind", "$user" },

                   };


                BsonDocument piplineStage6 = new BsonDocument {
                    { "$match", new BsonDocument
                        {
                            { "train.$tickets", new BsonDocument
                                {
                                    { "$elemMatch", new BsonDocument
                                        {
                                            { "_id", "$ticket_type" }

                                        }
                                    }
                                }
                            }
                        }
                    }
                   };
                //    BsonDocument piplineStage6 = new BsonDocument {
                //     { "$project" },

                //    };
                //         BsonDocument piplineStage4 = new BsonDocument{
                //             { "$project", new BsonDocument
                //     {
                //         { "_id", 1 },
                //         { "reserved_date", 1 },
                //         { "reserved_seat_count", 1 },
                //         { "reservation_price", 1 },
                //         // { "ticket_type", 1 },
                //         { "train", 1 },
                //         // { "user", 1 },
                //         // { "reserved_train", 1 },
                //         // { "reserved_user", 1 },
                //         { "reserved_train", new BsonDocument
                //             {
                //                 { "$arrayElemAt", new BsonDocument
                //                     {
                //                         { "input", "$train" },
                //                         { "at", 0 }
                //                     }
                //                 }
                //             }
                //         }
                //         //  {
                //         //     "user", new BsonDocument
                //         //     {
                //         //         { "$arrayElemAt", new BsonDocument
                //         //             {
                //         //                 { "input", "$user" },
                //         //                 { "at", 0 }

                //         //             }
                //         //         }
                //         //     }
                //         // },
                //     }
                // }

                //         };

                //             BsonDocument piplineStage5 = new BsonDocument{
                //              new BsonDocument
                // {
                //     { "$match", new BsonDocument
                //         {
                //             { "train.$tickets", new BsonDocument
                //                 {
                //                     { "$elemMatch", new BsonDocument
                //                         {
                //                             { "_id", new BsonObjectId("65274b91cf6f6485c293901e") }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
                // }
                //             };



                BsonDocument[] pipeline = new BsonDocument[

                ] { pipLineStage1, piplineStage2, piplineStage3, piplineStage4, piplineStage5, piplineStage6 };
                List<BsonDocument> pipelineList = _reservation.Aggregate<BsonDocument>(pipeline).ToList();
                foreach (var item in pipelineList)
                {
                    Console.WriteLine(item);
                }



                return new ServiceResponse<List<Reservation>>
                {
                    Message = "Bookings retrieved successfully",
                    Status = true,
                    Data = new List<Reservation>()
                    {

                    }
                };

                // return new ServiceResponse<List<Reservation>>
                // {
                //     Message = "Bookings retrieved successfully",
                //     Status = true,
                //     Data = reservations
                // };
            }
            catch (Exception ex)
            {
                return new ServiceResponse<List<Reservation>>
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

                var isExists = await _reservation.Find(Reservation => Reservation.Id == id).AnyAsync();

                if (!isExists)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Booking not found",
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
                // var Reservation = new Reservation
                // {

                //     ReservedTrainId = reservation.ReservedTrainId,
                //     ReservedUserId = reservation.ReservedUserId,
                //     ReservationPrice = reservation.ReservationPrice,
                //     ReservedDate = reservation.ReservedDate,
                //     ReservedSeatCount = reservation.ReservedSeatCount,

                // };

                var isExists = await _reservation.Find(Reservation => Reservation.Id == id).AnyAsync();

                if (!isExists)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Booking not found",
                        Status = false
                    };
                }
                var filter = Builders<Reservation>.Filter.Eq(Reservation => Reservation.Id, id);
                var update = Builders<Reservation>.Update
                    .Set(Reservation => Reservation.ReservedDate, reservation.ReservedDate)
                    .Set(Reservation => Reservation.ReservedTrainId, reservation.ReservedTrainId)
                    .Set(Reservation => Reservation.ReservedUserId, reservation.ReservedUserId)
                    .Set(Reservation => Reservation.ReservedSeatCount, reservation.ReservedSeatCount)
                    .Set(Reservation => Reservation.ReservationPrice, reservation.ReservationPrice)
                    .Set(Reservation => Reservation.TicketType, reservation.TicketType);


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
    }
}