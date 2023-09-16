using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EAD_WebService.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ReservationController : ControllerBase
    {


        [HttpGet]

        public ActionResult<List<Reservation>> Get()
        {
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult<Reservation> Get(string id)
        {
            return Ok();
        }


        [HttpPost]
        public ActionResult<Reservation> Post(Reservation reservation)
        {
            return Ok();
        }

        [HttpPatch("{id}")]

        public IActionResult Put(string id, Reservation reservationIn)
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