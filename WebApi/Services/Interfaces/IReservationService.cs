using EAD_WebService.Dto.Reservation;

namespace EAD_WebService.Services.Interfaces
{
    public interface IReservationService
    {
        Task<ServiceResponse<Reservation>> CreateReservation(ReservationDto reservation);
        Task<ServiceResponse<Reservation>> GetReservation(string id);
        Task<ServiceResponse<List<Reservation>>> GetReservation(BasicFilters filters);
        Task<ServiceResponse<EmptyData>> UpdateReservation(string id, ReservationDto reservation);
        Task<ServiceResponse<EmptyData>> RemoveReservation(string id);
    }
}