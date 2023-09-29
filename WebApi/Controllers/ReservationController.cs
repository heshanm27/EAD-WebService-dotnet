using EAD_WebService.Dto.Reservation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EAD_WebService.Controllers
{

    [ApiController]
    [Route("api/v1/reservation")]
    public class ReservationController : ControllerBase
    {


        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet()]

        public async Task<ActionResult<List<Reservation>>> Get([FromQuery] BasicFilters filters)
        {

            ServiceResponse<List<Reservation>> response = await _reservationService.GetReservation(filters);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> Get(string id)
        {
            ServiceResponse<Reservation> response = await _reservationService.GetReservation(id);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }


        [HttpPost, Authorize(Roles = "User,Admin,Agent")]
        public async Task<ActionResult<ServiceResponse<Reservation>>> Post(ReservationDto reservationDto)
        {

            // Console.WriteLine(reservation.ReservedUserId);
            ServiceResponse<Reservation> response = await _reservationService.CreateReservation(reservationDto);
            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        [HttpPatch("{id}")]

        public async Task<ActionResult<ServiceResponse<EmptyData>>> Put(string id, ReservationDto reservationIn)
        {
            ServiceResponse<EmptyData> response = await _reservationService.UpdateReservation(id, reservationIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Delete(string id)
        {
            ServiceResponse<EmptyData> response = await _reservationService.RemoveReservation(id);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }
    }
}