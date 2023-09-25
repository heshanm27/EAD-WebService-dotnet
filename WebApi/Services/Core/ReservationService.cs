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


        Task<ServiceResponse<Reservation>> IReservationService.GetReservation(string id)
        {
            throw new NotImplementedException();
        }

        Task<ServiceResponse<List<Reservation>>> IReservationService.GetReservation(BasicFilters filters)
        {
            throw new NotImplementedException();
        }

        Task<ServiceResponse<EmptyData>> IReservationService.RemoveReservation(string id)
        {
            throw new NotImplementedException();
        }

        Task<ServiceResponse<EmptyData>> IReservationService.UpdateReservation(string id, ReservationDto bookingIn)
        {
            throw new NotImplementedException();
        }
    }
}