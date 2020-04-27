using Data;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using e = Entites;

namespace Services
{
    public class Category: ICategory
    {
        private readonly IMongoContext<e.Category> mongo;
        public Category()
        {
            mongo = new MongoContext<e.Category>("categories");
        }

        public List<e.Category> GetByUser(e.User user)
        {
            var result = mongo.Find(u => u.user.UserName == user.UserName);
            foreach (var category in result)
            {
                category.SubCategories = new SubCategory().GetByCategory(category);
            }
            return result;
        }
        public bool Add(e.Category category)
        {
            category.user = new User().GetByUserName(category.user);
                return mongo.Insert(category);
        }
        public bool Update(e.Category category)
        {
            return mongo.Update(c => c.Id == category.Id, category);
        }
        public bool Delete(e.Category category)
        {
            return mongo.Delete(c => c.Id == category.Id);
        }
    }
}
