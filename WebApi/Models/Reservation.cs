using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace EAD_WebService.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("reservation_date")]
        public required DateTime ReservationDate { get; set; }

        public bool isActive { get; set; } = true;

        [BsonElement("reserved_train")]
        public ObjectId ReservedTrainId { get; set; }


        [BsonElement("reserved_user")]
        public ObjectId ReservedUserId { get; set; }


        [BsonElement("reservation_seat_count")]
        [BsonRequired]
        public int ReservationSeatCount { get; set; }

        [BsonElement("reservation_class")]
        [BsonRequired]
        public string ReservationClass { get; set; } = null!;

        [BsonElement("reservation_type")]
        [BsonRequired]
        public string ReservationType { get; set; } = null!;

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