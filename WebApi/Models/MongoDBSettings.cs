namespace EAD_WebService.Models;

public class MongoDBSettings
{

    public string ConnectionURI { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string UserCollection { get; set; } = null!;
    public string TrainCollection { get; set; } = null!;
    public string ReservationCollection { get; set; } = null!;

}