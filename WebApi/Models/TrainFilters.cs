

using System.ComponentModel.DataAnnotations;

namespace EAD_WebService.Models
{
    public class TrainFilters
    {
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
        public string? Order { get; set; }

        [Required(ErrorMessage = "Start Station is required")]
        public string start { get; set; } = null!;
        [Required(ErrorMessage = "End Station is required")]
        public string end { get; set; } = null!;
        [Required(ErrorMessage = "Date is required")]
        public string date { get; set; } = null!;
    }
}