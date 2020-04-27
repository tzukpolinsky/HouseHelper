using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;
using e = Entites;

namespace HouseHelper.Controllers
{
    [Route("categories")]

    public class CategoryController : Controller
    {
        private readonly ICategory categoryService;

        public CategoryController(ICategory category)
        {
            categoryService = category;
        }

        [HttpPost("getByUser")]
        public IActionResult GetByUser([FromBody]e.User user)
        {
            return Ok(categoryService.GetByUser(user));
        }
        [HttpPost("add")]
        public IActionResult Add([FromBody]e.Category category)
        {
            return Ok(categoryService.Add(category));
        }
        [HttpPost("update")]
        public IActionResult Update([FromBody]e.Category category)
        {
            return Ok(categoryService.Update(category));
        }
        [HttpPost("remove")]
        public IActionResult Remove([FromBody]e.Category category)
        {
            return Ok(categoryService.Delete(category));
        }
    }
}