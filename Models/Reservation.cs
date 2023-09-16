using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace EAD_WebService.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public required string Id { get; set; }

        [BsonElement("reservation_date")]
        public required DateTime ReservationDate { get; set; }


        public bool status { get; set; }

        //auto generate time stamp for created at and updated at 
        [BsonElement("created_at")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Utc)]
        [BsonRepresentation(BsonType.DateTime)]
        [BsonRequired()]
        public DateTime CreatedAt { get; set; }


        [BsonElement("updated_at")]
        [BsonRequired()]
        [BsonDateTimeOptions(Kind =DateTimeKind.Utc)]
        [BsonRepresentation(BsonType.DateTime)]
        public DateTime UpdatedAt { get; set;
        }

// 





    }
}