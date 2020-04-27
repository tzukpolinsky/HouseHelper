using System;
using System.Collections.Generic;
using System.Text;

namespace Services
{
    public interface ICRUD<T>
    {
        bool Add(T element);
        bool Update(T element);
        bool Delete(T element);
    }
}
