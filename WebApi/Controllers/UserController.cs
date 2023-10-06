using Microsoft.AspNetCore.Mvc;

namespace EAD_WebService.Controllers
{
    [ApiController]
    [Route("api/v1/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult<List<User>>> Get([FromQuery] BasicFilters filters)
        {
            ServiceResponse<List<User>> response = await _userService.getUsers(filters);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            ServiceResponse<User> response = await _userService.getUser(id);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }

        [HttpPatch("{id}")]

        public async Task<ActionResult<ServiceResponse<EmptyData>>> Put(string id, User userIn)
        {
            ServiceResponse<EmptyData> response = await _userService.updateUser(id, userIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Delete(string id)
        {
            ServiceResponse<EmptyData> response = await _userService.removeUser(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        [HttpPatch("{id}/activate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> activateUser(string id)
        {
            ServiceResponse<EmptyData> response = await _userService.activateUser(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        [HttpPatch("{id}/deactivate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> deactivateUser(string id)
        {
            ServiceResponse<EmptyData> response = await _userService.deativateUser(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        [HttpPatch("{id}/role")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> deactivateUser(string id, UserEnum userEnum)
        {
            ServiceResponse<EmptyData> response = await _userService.updateUserRole(id, userEnum);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

    }
}