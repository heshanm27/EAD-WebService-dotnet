using EAD_WebService.Dto.Reservation;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;


namespace EAD_WebService.Services.Core
{
    public class ReservationService : IReservationService
    {
        private readonly IMongoCollection<Reservation> _reservation;

        // create a constructor that takes in IOptions<MongoDBSettings> and assigns the value of the connectionURI,
        // databaseName and collectionName to the _reservation variable
        public ReservationService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            _reservation = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<Reservation>(mongoDBSettings.Value.ReservationCollection);
        }
        public async Task<ServiceResponse<Reservation>> CreateReservation(ReservationDto booking)
        {

            var Reservation = new Reservation
            {
                ReservationDate = booking.ReservationDate,
                ReservedTrainId = new ObjectId(booking.ReservedTrainId),
                ReservedUserId = new ObjectId(booking.ReservedUserId),
                ReservationSeat = booking.ReservationSeat,
                ReservationClass = booking.ReservationClass,
                ReservationType = booking.ReservationType,
                ReservationPrice = booking.ReservationPrice,


            };

            await _reservation.InsertOneAsync(Reservation);

            return new ServiceResponse<Reservation>
            {
                Message = "Booking created successfully",
                Status = true
            };
        }


        async Task<ServiceResponse<Reservation>> IReservationService.GetReservation(string id)
        {

            try
            {
                var Reservation = await _reservation.Find(Reservation => Reservation.Id == new ObjectId(id)).FirstOrDefaultAsync();

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
                reservations = reservations.Skip(filters.Page).Take(filters.PageSize).ToList();
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

                var isExists = await _reservation.Find(Reservation => Reservation.Id == new ObjectId(id)).AnyAsync();

                if (!isExists)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Booking not found",
                        Status = false
                    };
                }


                await _reservation.DeleteOneAsync(Reservation => Reservation.Id == new ObjectId(id));
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

        async Task<ServiceResponse<EmptyData>> IReservationService.UpdateReservation(string id, ReservationDto reservation)
        {
            try
            {
                var Reservation = new Reservation
                {
                    ReservationDate = reservation.ReservationDate,
                    ReservedTrainId = new ObjectId(reservation.ReservedTrainId),
                    ReservedUserId = new ObjectId(reservation.ReservedUserId),
                    ReservationSeat = reservation.ReservationSeat,
                    ReservationClass = reservation.ReservationClass,
                    ReservationType = reservation.ReservationType,
                    ReservationPrice = reservation.ReservationPrice,


                };

                var isExists = await _reservation.Find(Reservation => Reservation.Id == new ObjectId(id)).AnyAsync();

                if (!isExists)
                {
                    return new ServiceResponse<EmptyData>
                    {
                        Message = "Booking not found",
                        Status = false
                    };
                }
                var filter = Builders<Reservation>.Filter.Eq(Reservation => Reservation.Id, new ObjectId(id));
                var update = Builders<Reservation>.Update
                    .Set(Reservation => Reservation.ReservationDate, reservation.ReservationDate)
                    .Set(Reservation => Reservation.ReservedTrainId, new ObjectId(reservation.ReservedTrainId))
                    .Set(Reservation => Reservation.ReservedUserId, new ObjectId(reservation.ReservedUserId))
                    .Set(Reservation => Reservation.ReservationSeat, reservation.ReservationSeat)
                    .Set(Reservation => Reservation.ReservationClass, reservation.ReservationClass)
                    .Set(Reservation => Reservation.ReservationType, reservation.ReservationType)
                    .Set(Reservation => Reservation.ReservationPrice, reservation.ReservationPrice);


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