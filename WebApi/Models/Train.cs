using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace EAD_WebService.Models
{
    public class Train
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("train_name")]
        [BsonRequired]
        public string TrainName { get; set; } = null!;


        [BsonElement("train_number")]
        [BsonRequired]
        public string TrainNumber { get; set; } = null!;

        [BsonElement("start_station")]
        [BsonRequired]
        public string StartStation { get; set; } = null!;

        [BsonElement("end_station")]
        [BsonRequired]
        public string EndStation { get; set; } = null!;


        [BsonElement("train_start_time")]
        [BsonRequired]
        public DateTime TrainStartTime { get; set; }

        [BsonElement("train_end_time")]
        [BsonRequired]
        public DateTime TrainEndTime { get; set; }

        [BsonElement("departure_date")]
        [BsonRequired]
        public DateTime DepartureDate { get; set; }

        [BsonElement("tickets")]
        public List<Tickets> Tickets { get; set; } = new List<Tickets>();

        [BsonElement("reservation")]
        public List<string> Reservations { get; set; } = new List<string>();

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("isPublished")]
        public bool IsPublished { get; set; } = false;

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [BsonElement("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}