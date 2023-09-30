using Microsoft.AspNetCore.Mvc;

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
        [HttpGet]
        public async Task<ActionResult<List<Train>>> Get([FromQuery] BasicFilters filters)
        {
            ServiceResponse<List<Train>> response = await _trainService.getTrainSchedule();
            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Train>> Get(string id)
        {
            ServiceResponse<Train> response = await _trainService.getTrainSchedule(id);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Train>>> Post(Train train)
        {

            ServiceResponse<Train> response = await _trainService.createTrainSchedule(train);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }

        [HttpPatch("{id}/ticket")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> addTicket(string id, List<Tickets> trainIn)
        {

            ServiceResponse<EmptyData> response = await _trainService.addTickets(id, trainIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        [HttpPatch("{id}/ticket/{ticketId}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateTicket(string id, string ticketId, Tickets trainIn)
        {

            ServiceResponse<EmptyData> response = await _trainService.updateTickets(id, ticketId, trainIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        [HttpDelete("{id}/ticket/{ticketId}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> removeTicket(string id, string ticketId)
        {

            ServiceResponse<EmptyData> response = await _trainService.removeTickets(id, ticketId);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }


        [HttpPatch("{id}/activate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateActive(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.activateTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }


        [HttpPatch("{id}/deactivate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateDeactive(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.deactivateTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }


        [HttpPatch("{id}/publish")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updatePublish(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.publishTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }


        [HttpPatch("{id}/unpublish")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> updateUnpublish(string id)
        {

            ServiceResponse<EmptyData> response = await _trainService.unpublishTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        [HttpPatch("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Put(string id, Train trainIn)
        {

            ServiceResponse<EmptyData> response = await _trainService.updateTrainSchedule(id, trainIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Delete(string id)
        {
            ServiceResponse<EmptyData> response = await _trainService.removeTrainSchedule(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }


    }
}