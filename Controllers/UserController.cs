using Microsoft.AspNetCore.Mvc;

namespace EAD_WebService.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {

        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
            return Ok();
        }

        [HttpPatch("{id}")]

        public IActionResult Put(string id, User userIn)
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