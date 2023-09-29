

namespace EAD_WebService.Dto.Reservation
{
    public class ReservationDto
    {
        public required DateTime ReservationDate { get; set; }
        public required string ReservedTrainId { get; set; }

        public required string ReservedUserId { get; set; }

        public required int ReservationSeatCount { get; set; }


        public required string ReservationClass { get; set; }


        public required string ReservationType { get; set; }

        public required double ReservationPrice { get; set; }
    }
}