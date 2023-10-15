

namespace EAD_WebService.Dto.Reservation
{
    public class ReservationDto
    {
        public required string ReservationDate { get; set; }
        public required string ReservedTrainId { get; set; }

        public required string ReservedUserId { get; set; }

        public required int ReservationSeatCount { get; set; }

        public required Tickets Ticket { get; set; }

    }
}