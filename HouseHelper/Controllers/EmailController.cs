using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;
using e = Entites;

namespace HouseHelper.Controllers
{
    [Route("emails")]
    public class EmailController : Controller
    {
        private readonly IEmail emailService;

        public EmailController(IEmail emailService)
        {
            this.emailService = emailService;
        }

        [HttpPost("errorEmail")]
        public IActionResult ErrorEmail([FromBody] e.User user)
        {
            return Ok(emailService.SendErrorEmail(user));
        }
    }
}