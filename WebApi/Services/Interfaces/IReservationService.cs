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

        //create reservation service method
        Task<ServiceResponse<Reservation>> CreateReservation(Reservation reservation);
        //get one reservation service method
        Task<ServiceResponse<Reservation>> GetOneReservation(string id);
        //get all reservations service method
        Task<ServiceResponse<List<Reservation>>> GetReservation(BasicFilters filters, string userId);
        //update reservation service method
        Task<ServiceResponse<EmptyData>> UpdateReservation(string id, Reservation reservation);
        //remove reservation service method
        Task<ServiceResponse<EmptyData>> RemoveReservation(string id);
    }
}