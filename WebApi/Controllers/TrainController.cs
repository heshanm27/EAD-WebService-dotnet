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


        //
        [HttpPatch("{id}/tickets")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> addTicket(string id, List<Tickets> trainIn)
        {

            ServiceResponse<EmptyData> response = await _trainService.addTickets(id, trainIn);

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