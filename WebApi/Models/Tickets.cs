
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EAD_WebService.Models
{
    public class Tickets
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("ticket_type")]
        [BsonRequired]
        public string TicketType { get; set; } = null!;

        [BsonElement("ticket_price")]
        [BsonRequired]
        public double TicketPrice { get; set; }

        [BsonElement("ticket_count")]
        [BsonRequired]
        public int TicketCount { get; set; }

        [BsonElement("ticket_booked")]
        public int TicketBooked { get; set; } = 0;

    }
}