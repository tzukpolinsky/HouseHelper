using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Services;
using e = Entites;

namespace HouseHelper.Controllers
{
    [Route("users")]
    public class UserController : Controller
    {
        private readonly IUser userService;
        private readonly IConfiguration config;

        public UserController(IUser userService, IConfiguration config)
        {
            this.userService = userService;
            this.config = config;
        }

        [AllowAnonymous]
        [HttpPost("add")]
        public IActionResult Add([FromBody] e.User user)
        {
            return Ok(userService.Create(user));
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] e.User user)
        {
            var result = userService.Login(user);
            if (result.isSuccess)
            {
                var token = new Policies().GenerateJWTToken(result.user, config);
                return Ok(new { result.isSuccess, result.msg, result.user,token });
            }
            else
            {
                return Ok(result);
            }
           
        }
    }
}