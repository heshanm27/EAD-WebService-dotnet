using CloudinaryDotNet;
using Microsoft.Extensions.Options;

namespace EAD_WebService.Util
{
    public class CloudinaryConfig
    {

        private static Cloudinary _cloudinaryInstance;
        private static readonly object _lockObject = new object();

        private CloudinaryConfig()
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();
            // Initialize Cloudinary only once
            _cloudinaryInstance = new Cloudinary("cloudinary://737534531764396:DwiXC3gc2PqhZ2I4JbBrbX7dv7w@eadtask");
        }

        public static Cloudinary GetCloudinaryInstance()
        {
            // Check if the instance is already created, and if not, create it
            if (_cloudinaryInstance == null)
            {
                lock (_lockObject)
                {
                    if (_cloudinaryInstance == null)
                    {
                        new CloudinaryConfig(); // Initialize the instance
                    }
                }
            }

            return _cloudinaryInstance;
        }
    }
}