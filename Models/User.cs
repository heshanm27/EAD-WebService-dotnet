
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EAD_WebService.Models
{
    public class User
    {


        public ObjectId Id { get; set; }

        [BsonElement("email")]
        [BsonRequired]
        [BsonRepresentation(MongoDB.Bson.BsonType.String)]
        public string Email { get; set; } = null!;

        [BsonElement("first_name")]
        [BsonRequired]   
        public string FirstName { get; set; } = null!;

        [BsonElement("last_name")]
        [BsonRequired]
        public string LastName { get; set; } = null!;

        [BsonElement("password")]
        [BsonRequired]
        public string Password { get; set; } = null!;

        [BsonElement("avatar_url")]
        public string AvatarUrl { get; set; } = string.Empty;

        [BsonElement("role")]
        [BsonDefaultValue(UserEnum.User)]

        public string Role { get; set; } = UserEnum.User;

        [BsonElement("is_active")]
        [BsonDefaultValue(true)]
        public bool IsActive { get; set; }


        [BsonElement("created_at")]
        public DateTime CreatedAt { get; set; }

        [BsonElement("updated_at")]
        public DateTime UpdatedAt { get; set; }

    
    }
}