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

        [HttpGet()]

        public async Task<ActionResult<List<Reservation>>> Get([FromQuery] BasicFilters filters)
        {

            ServiceResponse<List<Reservation>> response = await _reservationService.GetReservation(filters);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //API endpoint for getting one reservation for given reservation id

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
                ReservationPrice = reservationDto.ReservationPrice,
                ReservedDate = ReservationDate,
                TicketType = reservationDto.TicketType
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
                ReservationPrice = reservationIn.ReservationPrice,
                ReservedDate = ReservationDate,
                TicketType = reservationIn.TicketType
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