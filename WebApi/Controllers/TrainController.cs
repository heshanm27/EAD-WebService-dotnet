using System.Globalization;
using EAD_WebService.Dto.Train;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

/*
    File: Train Controller.cs
    Author:
    Description: This file is used Manage the train information and shedules.
 */

namespace EAD_WebService.Controllers
{
    [ApiController]
    [Route("api/v1/train")]
    public class TrainController : ControllerBase
    {

        private readonly ITrainScheduleService _trainService;
        public TrainController(ITrainScheduleService trainService)
        {
            _trainService = trainService;
        }

        //This API provides all train shedules
        [HttpGet]
        public async Task<ActionResult<List<Train>>> Get([FromQuery] BasicFilters filters)
        {
            ServiceResponse<List<Train>> response = await _trainService.getTrainSchedule();

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        //This API provide train shedule for given shedule ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> Get(string id)
        {
            ServiceResponse<Train> response = await _trainService.getTrainSchedule(id);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //This is used to add new train shedule to the database
        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Train>>> Post(TrainCreateDto train)
        {


            DateTime startParseTime = DateTime.ParseExact(train.TrainStartTime, "HH:mm", CultureInfo.InvariantCulture);
            DateTime endParseTime = DateTime.ParseExact(train.TrainEndTime, "HH:mm", CultureInfo.InvariantCulture);
            DateTime departureParseDate = DateTime.ParseExact(train.DepartureDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            Train recievedTrain = new Train
            {


                TrainNumber = train.TrainNumber,
                TrainName = train.TrainName,
                StartStation = train.StartStation,
                EndStation = train.EndStation,
                TrainStartTime = startParseTime,
                TrainEndTime = endParseTime,
                DepartureDate = departureParseDate,
                Tickets = train.Tickets.Select(ticket => new Tickets
                {
                    Id = ObjectId.GenerateNewId().ToString(),
                    TicketType = ticket.TicketType,
                    TicketPrice = ticket.TicketPrice,
                    TicketCount = ticket.TicketCount
                }).ToList()
            };

            ServiceResponse<Train> response = await _trainService.createTrainSchedule(recievedTrain);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }


     //This API is used to add new tickets to the train shedule
        [HttpPatch("{id}/ticket")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> addTicket(string id, List<Tickets> trainIn)
        {

            ServiceResponse<EmptyData> response = await _trainService.addTickets(id, trainIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        //This API is used to update the tickets in the train shedule
        [HttpPatch("{id}/ticket/{ticketId}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateTicket(string id, string ticketId, Tickets trainIn)
        {

            ServiceResponse<EmptyData> response = await _trainService.updateTickets(id, ticketId, trainIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        //This API is used to remove the tickets in the train shedule
        [HttpDelete("{id}/ticket/{ticketId}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> removeTicket(string id, string ticketId)
        {

            ServiceResponse<EmptyData> response = await _trainService.removeTickets(id, ticketId);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

    //This API is used to activate the train shedule
        [HttpPatch("{id}/activate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateActive(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.activateTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        //This API is used to deactivate the train shedule
        [HttpPatch("{id}/deactivate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateDeactive(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.deactivateTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

    //This API is used to publish the train shedule
        [HttpPatch("{id}/publish")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updatePublish(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.publishTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        //This API is used to unpublish the train shedule
        [HttpPatch("{id}/unpublish")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateUnpublish(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.unpublishTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

//This API is used to update the train shedule
        [HttpPatch("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Put(string id, TrainUpdateDo trainIn)
        {

            DateTime startParseTime = DateTime.ParseExact(trainIn.TrainStartTime, "HH:mm", CultureInfo.InvariantCulture);
            DateTime endParseTime = DateTime.ParseExact(trainIn.TrainEndTime, "HH:mm", CultureInfo.InvariantCulture);
            DateTime departureParseDate = DateTime.ParseExact(trainIn.DepartureDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            Train updatedTrain = new Train
            {
                TrainNumber = trainIn.TrainNumber,
                TrainName = trainIn.TrainName,
                StartStation = trainIn.StartStation,
                EndStation = trainIn.EndStation,
                TrainStartTime = startParseTime,
                TrainEndTime = endParseTime,
                DepartureDate = departureParseDate
            };

            ServiceResponse<EmptyData> response = await _trainService.updateTrainSchedule(id, updatedTrain);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

//This API is used to remove the train shedule
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Delete(string id)
        {
            ServiceResponse<EmptyData> response = await _trainService.removeTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }


    }
}