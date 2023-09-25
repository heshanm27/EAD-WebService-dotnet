
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EAD_WebService.Models
{
    public class TrainTicketPrice
    {


        [BsonElement("ticket_class")]
        [BsonRequired]

        public string TicketClass { get; set; } = null!;

        [BsonElement("ticket_type")]
        [BsonRequired]
        public string TicketType { get; set; } = null!;

        [BsonElement("ticket_price")]
        [BsonRequired]
        public double TicketPrice { get; set; }


    }
}