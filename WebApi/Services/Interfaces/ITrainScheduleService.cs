/*
    File: ITrainSheduleService.cs
    Author:
    Description: This is the custom interface for handling train sheduling.
*/


using EAD_WebService.Dto.Train;

namespace EAD_WebService.Services.Interfaces
{
    public interface ITrainScheduleService
    {

        //create train schedule service method
        Task<ServiceResponse<Train>> createTrainSchedule(Train train);
        //get one train schedule service method
        Task<ServiceResponse<Train>> getTrainSchedule(string id);
        //get all train schedules service method
        Task<ServiceResponse<List<TrainGetReponseDto>>> getTrainSchedule(TrainFilters filters);
        //update train schedule service method
        Task<ServiceResponse<EmptyData>> updateTrainSchedule(string id, Train trainIn);
        //remove train schedule service method
        Task<ServiceResponse<EmptyData>> removeTrainSchedule(string id);

        //add reservation service method
        Task<bool> addReservation(string trainId, string reservationId, string ticketId, int ticketCount);
        //remove reservation service method
        Task<bool> removeReservation(string trainId, string reservationId);
        //updatet train schedule status service method
        Task<ServiceResponse<EmptyData>> publishTrainSchedule(string id);
        //updatet train schedule status service method
        Task<ServiceResponse<EmptyData>> unpublishTrainSchedule(string id);
        //activate train schedule service method
        Task<ServiceResponse<EmptyData>> activateTrainSchedule(string id);
        //deactivate train schedule service method
        Task<ServiceResponse<EmptyData>> deactivateTrainSchedule(string id);
        //add tickets service method
        Task<ServiceResponse<EmptyData>> addTickets(string id, List<Tickets> tickets);
        //remove tickets service method
        Task<ServiceResponse<EmptyData>> removeTickets(string trainid, string ticketsId);
        //update tickets service method
        Task<ServiceResponse<EmptyData>> updateTickets(string trainid, string ticketsId, Tickets ticketsIn);
        //update tickets availability service method
        Task<ServiceResponse<EmptyData>> updateTicketsAvailability(string trainid, string ticketsId, int count);





    }
}