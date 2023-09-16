


namespace EAD_WebService.Services.Interfaces
{
    public interface IReservationService
    {
        Reservation CreateBooking(Reservation booking);
        Reservation GetBooking(string id);
        List<Reservation> GetBookings();
        void UpdateBooking(string id, Reservation bookingIn);
        void RemoveBooking(string id);
    }
}