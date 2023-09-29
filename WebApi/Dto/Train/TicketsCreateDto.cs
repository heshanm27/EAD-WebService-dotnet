using System.ComponentModel.DataAnnotations;


namespace EAD_WebService.Dto.Train
{
    public class TicketsCreateDto
    {

        [Required(ErrorMessage = "Ticket Type is required")]
        public string TicketType { get; set; } = null!;

        [Required(ErrorMessage = "Ticket Price is required")]
        public double TicketPrice { get; set; }

        [Required(ErrorMessage = "Ticket Count is required")]
        public int TicketCount { get; set; }
    }
}