using System;
using System.Collections.Generic;
using System.Text;
using Data;
using e = Entites;
namespace Services
{
    public class SubCategory : ISubCategory
    {
        private readonly IMongoContext<e.SubCategory> mongo;
        public SubCategory()
        {
            mongo = new MongoContext<e.SubCategory>("subCategories");
        }
        public List<e.SubCategory> GetByCategory(e.Category category)
        {
            return mongo.Find(s => s.Category.Id == category.Id);
        }
        public bool Add(e.SubCategory sub)
        {
            return mongo.Insert(sub);
        }
        public bool Update(e.SubCategory sub)
        {
            return mongo.Update(s => s.Id == sub.Id, sub);
        }
        public bool Delete(e.SubCategory sub)
        {
            return mongo.Delete(s => s.Id == sub.Id);
        }
    }
}
