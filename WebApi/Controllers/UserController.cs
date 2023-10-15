using Microsoft.AspNetCore.Mvc;

/*
    File: UserController.cs
    Author: IT20068028
    Description: This file is used Manage User Information.
*/

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


        //This API is used to get the all uesr information
        [HttpGet]
        public async Task<ActionResult<List<User>>> Get([FromQuery] BasicFilters filters)
        {
            ServiceResponse<List<User>> response = await _userService.getUsers(filters);
            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //This API proides User information for given User ID
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            ServiceResponse<User> response = await _userService.getUser(id);

            if (!response.Status) return BadRequest(response);

            return Ok(response);
        }

        //This API used to update the user information for given user ID
        [HttpPatch("{id}")]

        public async Task<ActionResult<ServiceResponse<EmptyData>>> Put(string id, User userIn)
        {
            ServiceResponse<EmptyData> response = await _userService.updateUser(id, userIn);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }


        //This API is used to delete User information per given user ID
        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> Delete(string id)
        {
            ServiceResponse<EmptyData> response = await _userService.removeUser(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //This API is used to activate user for given user ID
        //The status of the user will be acrivated when executed
        
        [HttpPatch("{id}/activate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> activateUser(string id)
        {
            ServiceResponse<EmptyData> response = await _userService.activateUser(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //This API is used to deactivate user for given user ID
        //The status of the user will be de-acrivated when executed

        [HttpPatch("{id}/deactivate")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> deactivateUser(string id)
        {
            ServiceResponse<EmptyData> response = await _userService.deativateUser(id);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

        //This API is used to change the user role of the given user ID
        [HttpPatch("{id}/role")]
        public async Task<ActionResult<ServiceResponse<EmptyData>>> deactivateUser(string id, UserEnum userEnum)
        {
            ServiceResponse<EmptyData> response = await _userService.updateUserRole(id, userEnum);

            if (!response.Status) return BadRequest(response);
            return Ok(response);
        }

    }
}