
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EAD_WebService.Dto.Reservation
{
    public class ReservationSuceessResponse
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("reserved_date")]
        [BsonRequired]
        public DateTime ReservedDate { get; set; }

        [BsonElement("isActive")]
        public bool IsActive { get; set; } = true;

        [BsonElement("reserved_seat_count")]
        [BsonRequired]
        public int ReservedSeatCount { get; set; }

        [BsonElement("ticket")]
        [BsonRequired]
        public Tickets Ticket { get; set; }

        [BsonElement("reservation_price")]
        [BsonRequired]
        public double ReservationPrice { get; set; }

        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);

        [BsonElement("user")]
        public UserResponse userResponse { get; set; }

        [BsonElement("train")]
        public TrainResponse trainResponse { get; set; }

    }


    public class TrainResponse
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("train_name")]
        public string TrainName { get; set; }

        [BsonElement("train_number")]
        public string TrainNumber { get; set; }

        [BsonElement("start_station")]
        public string StartStation { get; set; }

        [BsonElement("end_station")]
        public string EndStation { get; set; }

        [BsonElement("train_start_time")]
        public DateTime TrainStartTime { get; set; }

        [BsonElement("train_end_time")]
        public DateTime TrainEndTime { get; set; }

        [BsonElement("departure_date")]
        public DateTime DepartureDate { get; set; }
    }

    public class UserResponse
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("first_name")]
        public string FirstName { get; set; }

        [BsonElement("last_name")]
        public string LastName { get; set; }
    }
}