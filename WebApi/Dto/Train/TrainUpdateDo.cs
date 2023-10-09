
namespace EAD_WebService.Dto.Train
{
    public class TrainUpdateDo
    {

        public string TrainName { get; set; } = null!;


        public string TrainNumber { get; set; } = null!;


        public string StartStation { get; set; } = null!;


        public string EndStation { get; set; } = null!;


        public string TrainStartTime { get; set; } = null!;


        public string TrainEndTime { get; set; } = null!;


        public string DepartureDate { get; set; } = null!;
    }
}