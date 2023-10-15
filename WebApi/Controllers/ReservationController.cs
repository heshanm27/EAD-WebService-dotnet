using System.Globalization;
using EAD_WebService.Dto.Reservation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

/*
    File: Resrvation Controller.cs
    Author:
    Description: This file is used to manage the reservations/bookings.
 */

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

        [HttpGet("upcoming/{id}")]
        public async Task<ActionResult<ServiceResponse<List<ReservationFormatedResponse>>>> UpcomingReservation([FromQuery] BasicFilters filters, string id)
        {
            Console.WriteLine(filters.Order);
            ServiceResponse<List<ReservationFormatedResponse>> response = await _reservationService.GetUpcomingReservation(filters, id);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }

        [HttpGet("past/{id}")]
        public async Task<ActionResult<ServiceResponse<List<ReservationFormatedResponse>>>> GetPastReservation([FromQuery] BasicFilters filters, string id)
        {
            ServiceResponse<List<ReservationFormatedResponse>> response = await _reservationService.GetPastReservation(filters, id);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> Get(string id)
        {
            ServiceResponse<Reservation> response = await _reservationService.GetOneReservation(id);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }


        //API endpoit for add new reservation

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<Reservation>>> Post(ReservationDto reservationDto)
        {

            DateTime ReservationDate = DateTime.ParseExact(reservationDto.ReservationDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            Reservation reservation = new Reservation
            {
                ReservedTrainId = reservationDto.ReservedTrainId,
                ReservedSeatCount = reservationDto.ReservationSeatCount,
                ReservedUserId = reservationDto.ReservedUserId,
                ReservedDate = ReservationDate.AddHours(5).AddMinutes(30),
                Ticket = reservationDto.Ticket
            };

            // Console.WriteLine(reservation.ReservedUserId);
            ServiceResponse<Reservation> response = await _reservationService.CreateReservation(reservation);
            if (!response.Status) return BadRequest(response);
            return Ok(response);

        }

        //API Endpoint for updating the reservation

        [HttpPatch("{id}")]

        public async Task<ActionResult<ServiceResponse<EmptyData>>> Put(string id, ReservationUpdateDto reservationIn)
        {



            DateTime ReservationDate = DateTime.ParseExact(reservationIn.ReservationDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);

            Reservation reservation = new Reservation
            {
                ReservedTrainId = reservationIn.ReservedTrainId,
                ReservedSeatCount = reservationIn.ReservationSeatCount,
                ReservedUserId = reservationIn.ReservedUserId,
                ReservedDate = ReservationDate.AddHours(5).AddMinutes(30),
                Ticket = reservationIn.Ticket

            };
            ServiceResponse<EmptyData> response = await _reservationService.UpdateReservation(id, reservation);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //API endpoint for deleting reservations.

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Delete(string id)
        {
            ServiceResponse<EmptyData> response = await _reservationService.RemoveReservation(id);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }
    }
}