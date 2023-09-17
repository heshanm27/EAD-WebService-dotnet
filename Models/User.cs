
using MongoDB.Bson.Serialization.Attributes;

namespace EAD_WebService.Models
{
    public class User
    {

        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public int Id { get; set; }

        [BsonElement("email")]
        [BsonRequired]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Email { get; set; } = null!;

         [BsonElement("first_name")]
        [BsonRequired]   
        public string FirstName { get; set; } = null!;

        [BsonElement("last_name")]
        [BsonRequired]
        public string LastName { get; set; }

        [BsonElement("password")]
        [BsonRequired]
        public string Password { get; set; }   

        [BsonElement("avatar_url")]
        public string AvatarUrl { get; set; }

        [BsonElement("role")]
        [BsonDefaultValue("user")]
        public string Role { get; set; }

        [BsonElement("is_active")]
        [BsonDefaultValue(true)]
        public bool IsActive { get; set; }


        [BsonElement("created_at")]
        [BsonRepresentation(MongoDB.Bson.BsonType.Timestamp)]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updated_at")]
        [BsonRepresentation(MongoDB.Bson.BsonType.Timestamp)]
        public DateTime UpdatedAt { get; set; }

    
    }
}