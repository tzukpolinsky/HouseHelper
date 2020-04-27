using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;

namespace Data
{
    public interface IMongoContext<T>
    {
        List<T> Find(Expression<Func<T, bool>> query);
        bool Insert(T element);
        bool InsertMany(List<T> elements);
        bool Update(Expression<Func<T, bool>> query, T newElement);
        bool UpdateMany(Expression<Func<T, bool>> query, List<T> newElements);
        bool Delete(Expression<Func<T, bool>> query);
    }
}
