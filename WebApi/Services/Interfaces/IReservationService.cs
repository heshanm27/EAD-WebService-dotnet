using EAD_WebService.Dto.Reservation;

/*
    File: IReservationService.cs
    Author:
    Description: This is the custom interface for handling ticket reservations.
*/

namespace EAD_WebService.Services.Interfaces
{
    public interface IReservationService
    {
        Task<ServiceResponse<Reservation>> CreateReservation(Reservation reservation);
        Task<ServiceResponse<Reservation>> GetOneReservation(string id);
        Task<ServiceResponse<List<Reservation>>> GetReservation(BasicFilters filters);
        Task<ServiceResponse<EmptyData>> UpdateReservation(string id, Reservation reservation);
        Task<ServiceResponse<EmptyData>> RemoveReservation(string id);
    }
}