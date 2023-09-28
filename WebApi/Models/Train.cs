using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EAD_WebService.Models
{
    public class Train
    {


        public ObjectId Id { get; set; }


        [BsonElement("train_name")]
        [BsonRequired]
        public string TrainName { get; set; } = null!;

        [BsonElement("train_type")]
        [BsonRequired]
        public string TrainType { get; set; } = null!;

        [BsonElement("train_route")]
        [BsonRequired]
        public string TrainRoute { get; set; } = null!;


        [BsonElement("train_start")]
        [BsonRequired]
        public string TrainStart { get; set; } = null!;

        [BsonElement("train_end")]
        [BsonRequired]
        public string TrainEnd { get; set; } = null!;


        [BsonElement("train_start_time")]
        [BsonRequired]
        public DateTime TrainStartTime { get; set; }

        [BsonElement("train_end_time")]
        [BsonRequired]
        public DateTime TrainEndTime { get; set; }

        [BsonElement("train_start_date")]
        [BsonRequired]
        public DateTime TrainStartDate { get; set; }

        [BsonElement("train_ticket_prices")]
        public List<TrainTicketPrice> TrainTicketPrices { get; set; } = new List<TrainTicketPrice>();


        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        [BsonElement("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}