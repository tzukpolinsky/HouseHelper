using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Services;
using e = Entites;

namespace HouseHelper.Controllers
{
    [Route("subCategories")]
    public class SubCategoryController : Controller
    {
        private readonly ISubCategory subCategoryService;

        public SubCategoryController(ISubCategory category)
        {
            subCategoryService = category;
        }

        [HttpPost("getByCategory")]
        public IActionResult GetByCategory([FromBody]e.Category category)
        {
            return Ok(subCategoryService.GetByCategory(category));
        }
        [HttpPost("add")]
        public IActionResult Add([FromBody]e.SubCategory subCategory)
        {
            return Ok(subCategoryService.Add(subCategory));
        }
        [HttpPost("update")]
        public IActionResult Update([FromBody]e.SubCategory subCategory)
        {
            return Ok(subCategoryService.Update(subCategory));
        }
        [HttpPost("remove")]
        public IActionResult Remove([FromBody]e.SubCategory subCategory)
        {
            return Ok(subCategoryService.Delete(subCategory));
        }
    }
}