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
        public required string ReservedTrainId { get; set; }


        [BsonElement("reserved_user")]

        [BsonRepresentation(BsonType.ObjectId)]
        public required string ReservedUserId { get; set; }


        [BsonElement("reserved_seat_count")]
        [BsonRequired]
        public int ReservedSeatCount { get; set; }


        [BsonElement("ticket")]
        [BsonRequired]
        public required Tickets Ticket { get; set; }

        [BsonElement("reservation_price")]
        [BsonRequired]
        public double ReservationPrice { get; set; }

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);

        [BsonElement("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);


    }
}