using System;
using System.Collections.Generic;
using System.Text;
using e = Entites;

namespace Services
{
    public interface ISubCategory: ICRUD<e.SubCategory>
    {
        List<e.SubCategory> GetByCategory(e.Category category);
    }
}
