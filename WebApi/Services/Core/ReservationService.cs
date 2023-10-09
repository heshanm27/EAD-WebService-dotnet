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

        async Task<ServiceResponse<List<Reservation>>> IReservationService.GetReservation(BasicFilters filters)
        {
            try
            {


                //get all the reservations
                var reservations = await _reservation.Find(Reservation => true).ToListAsync();
                //limit the reservations to the number of records specified in the filters
                //reservations = reservations.Skip(filters.Page).Take(filters.PageSize).ToList();
                //return the reservations make order by the sortby field and order specified in the filters



                return new ServiceResponse<List<Reservation>>
                {
                    Message = "Bookings retrieved successfully",
                    Status = true,
                    Data = reservations
                };
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
                if (reservation.ReservedSeatCount > 5)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "You can only book a maximum of 5 seats",
                        Status = false
                    };

                }

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