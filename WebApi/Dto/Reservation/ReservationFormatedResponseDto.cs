

namespace EAD_WebService.Dto.Reservation
{
    public class ReservationFormatedResponse
    {


        public string Id { get; set; }
        public string ReservedDate { get; set; }

        public bool IsActive { get; set; } = true;

        public int ReservedSeatCount { get; set; }


        public Tickets Ticket { get; set; }



        public double ReservationPrice { get; set; }


        public string CreatedAt { get; set; }

        public UserDtoResponse userResponse { get; set; }


        public TrainDtoResponse trainResponse { get; set; }

    }


    public class TrainDtoResponse
    {

        public string Id { get; set; }


        public string TrainName { get; set; }


        public string TrainNumber { get; set; }


        public string StartStation { get; set; }


        public string EndStation { get; set; }

        public string TrainStartTime { get; set; }


        public string TrainEndTime { get; set; }


        public string DepartureDate { get; set; }
    }

    public class UserDtoResponse
    {

        public string Id { get; set; }


        public string FirstName { get; set; }


        public string LastName { get; set; }
    }

}