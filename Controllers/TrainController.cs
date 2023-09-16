using Microsoft.AspNetCore.Mvc;
namespace EAD_WebService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainController : ControllerBase
    {

        [HttpGet]
        public ActionResult<List<Train>> Get()
        {
            return Ok();
        }


        [HttpGet("{id}")]
        public ActionResult<Train> Get(string id)
        {
            return Ok();
        }

        [HttpPost]
        public ActionResult<Train> Post(Train train)
        {
            return Ok();
        }

        [HttpPatch("{id}")]
        public IActionResult Put(string id, Train trainIn)
        {
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            return Ok();
        }


    }
}