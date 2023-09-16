using MongoExample.Models;
using Microsoft.Extensions.Options;

namespace EAD_WebService.Controllers;

public class MongoDBService {


    public MongoDBService(IOptions<MongoDBSettings> mongoDBSettings) {
      
    }


}