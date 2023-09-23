using EAD_WebService.Services.Interfaces;
using Microsoft.Extensions.Options;
using MongoDB.Driver;


namespace EAD_WebService.Services.Core
{
    public class ReservationService : IReservationService
    {
        private readonly IMongoCollection<Reservation> _reservation;

        // create a constructor that takes in IOptions<MongoDBSettings> and assigns the value of the connectionURI,
        // databaseName and collectionName to the _reservation variable
        public ReservationService(IOptions<MongoDBSettings> mongoDBSettings )
        {
            _reservation = new MongoClient(mongoDBSettings.Value.ConnectionURI)
                .GetDatabase(mongoDBSettings.Value.DatabaseName)
                .GetCollection<Reservation>(mongoDBSettings.Value.ReservationCollection);
        }
        public Reservation CreateBooking(Reservation booking)
        {
            throw new NotImplementedException();
        }

        public Reservation GetBooking(string id)
        {
            throw new NotImplementedException();
        }

        public List<Reservation> GetBookings()
        {
            throw new NotImplementedException();
        }

        public void RemoveBooking(string id)
        {
            throw new NotImplementedException();
        }

        public void UpdateBooking(string id, Reservation bookingIn)
        {
            throw new NotImplementedException();
        }
    }
}