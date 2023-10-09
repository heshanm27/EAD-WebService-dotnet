using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace EAD_WebService.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("reserved_date")]
        public required DateTime ReservedDate { get; set; }

        public bool isActive { get; set; } = true;

        [BsonElement("reserved_train")]

        [BsonRepresentation(BsonType.ObjectId)]
        public string ReservedTrainId { get; set; }


        [BsonElement("reserved_user")]

        [BsonRepresentation(BsonType.ObjectId)]
        public string ReservedUserId { get; set; }


        [BsonElement("reserved_seat_count")]
        [BsonRequired]
        public int ReservedSeatCount { get; set; }

        [BsonElement("ticket_type")]
        [BsonRequired]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TicketType { get; set; }

        [BsonElement("reservation_price")]
        [BsonRequired]
        public double ReservationPrice { get; set; }

        //auto generate time stamp for created at and updated at 
        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


        [BsonElement("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;


    }
}