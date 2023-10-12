
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

/*
    File: User.cs
    Author:
    Description: This file is used to store the model for user information.
 */

namespace EAD_WebService.Models
{
    public class User
    {


        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("email")]
        [BsonRequired]
        public string Email { get; set; } = null!;

        [BsonElement("nic")]
        [BsonRequired]
        public string Nic { get; set; } = null!;


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
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);

        [BsonElement("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow.AddHours(5).AddMinutes(30);


    }
}