
namespace EAD_WebService.Models
{
    public class ServiceResponse<T>
    {
        public T? Data { get; set; } = default(T);
        public bool Status { get; set; } = true;
        public string? Message { get; set; } = string.Empty;
        
    }
}