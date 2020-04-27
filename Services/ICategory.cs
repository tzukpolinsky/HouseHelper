using System;
using System.Collections.Generic;
using System.Text;
using e = Entites;

namespace Services
{
    public interface ICategory: ICRUD<e.Category>
    {
        List<e.Category> GetByUser(e.User user);
    }
}
