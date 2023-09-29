
using System.ComponentModel.DataAnnotations;

namespace EAD_WebService.Dto.Train
{
    public class TrainCreateDto
    {

        [Required(ErrorMessage = "Train Name is required")]
        public string TrainName { get; set; } = null!;

        [Required(ErrorMessage = "Train Number is required")]
        public string TrainNumber { get; set; } = null!;

        [Required(ErrorMessage = "Start Station is required")]
        public string StartStation { get; set; } = null!;

        [Required(ErrorMessage = "End Station is required")]
        public string EndStation { get; set; } = null!;

        [Required(ErrorMessage = "Train Start Time is required")]
        public DateTime TrainStartTime { get; set; }

        [Required(ErrorMessage = "Train End Time is required")]
        public DateTime TrainEndTime { get; set; }

        [Required(ErrorMessage = "Departure Date is required")]
        public DateTime DepartureDate { get; set; }

        [Required(ErrorMessage = "Tickets is required")]
        public List<TicketsCreateDto> Tickets { get; set; } = new List<TicketsCreateDto>();
    }
}