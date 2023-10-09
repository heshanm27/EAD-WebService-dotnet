


namespace EAD_WebService.Services.Interfaces
{
    public interface ITrainScheduleService
    {
        Task<ServiceResponse<Train>> createTrainSchedule(Train train);
        Task<ServiceResponse<Train>> getTrainSchedule(string id);
        Task<ServiceResponse<List<Train>>> getTrainSchedule();
        Task<ServiceResponse<EmptyData>> updateTrainSchedule(string id, Train trainIn);
        Task<ServiceResponse<EmptyData>> removeTrainSchedule(string id);
        Task<bool> addReservation(string trainId, string reservationId);

        Task<bool> removeReservation(string trainId, string reservationId);

        Task<ServiceResponse<EmptyData>> publishTrainSchedule(string id);

        Task<ServiceResponse<EmptyData>> unpublishTrainSchedule(string id);

        Task<ServiceResponse<EmptyData>> activateTrainSchedule(string id);

        Task<ServiceResponse<EmptyData>> deactivateTrainSchedule(string id);

        Task<ServiceResponse<EmptyData>> addTickets(string id, List<Tickets> tickets);

        Task<ServiceResponse<EmptyData>> removeTickets(string trainid, string ticketsId);

        Task<ServiceResponse<EmptyData>> updateTickets(string trainid, string ticketsId, Tickets ticketsIn);

        Task<ServiceResponse<EmptyData>> updateTicketsAvailability(string trainid, string ticketsId, int count);





    }
}