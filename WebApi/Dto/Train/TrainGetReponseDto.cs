
namespace EAD_WebService.Dto.Train
{
    public class TrainGetReponseDto
    {

        public string? Id { get; set; }


        public string TrainName { get; set; } = null!;



        public string TrainNumber { get; set; } = null!;


        public string StartStation { get; set; } = null!;


        public string EndStation { get; set; } = null!;



        public string TrainStartTime { get; set; }


        public string TrainEndTime { get; set; }


        public string DepartureDate { get; set; }


        public List<Tickets> Tickets { get; set; } = new List<Tickets>();

        public List<string> Reservations { get; set; } = new List<string>();


        public bool IsActive { get; set; } = true;


        public bool IsPublished { get; set; } = false;


    }
}