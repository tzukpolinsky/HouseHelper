using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq.Expressions;

namespace Data
{
    public class MongoContext<T>: IMongoContext<T>
    {
        private IMongoCollection<T> collection;

        public MongoContext(string databaseName)
        {
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json"));
            var root = builder.Build();
            var mongoClient = new MongoClient(root.GetSection("MongoDb:MongoConnectionString").Value);
            collection = mongoClient.GetDatabase(root.GetSection("MongoDb:MongoDatabases:firstDatabase").Value).GetCollection<T>(databaseName);
        }

        public List<T> Find(Expression<Func<T, bool>> query)
        {
            var result = collection.Find<T>(query);
            if (result!=null)
            {
                return result.ToList();
            }
            return null;
            
        }
        public bool Insert(T element)
        {
            try
            {
                collection.InsertOne(element);
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public bool InsertMany(List<T> elements)
        {
            try
            {
                collection.InsertMany(elements);
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public bool Update(Expression<Func<T, bool>> query, T newElement)
        {
            try
            {
                collection.FindOneAndUpdate<T>(query,new ObjectUpdateDefinition<T>(newElement));
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public bool UpdateMany(Expression<Func<T, bool>> query,List<T> newElements)
        {
            try
            {
                collection.UpdateMany<T>(query, new ObjectUpdateDefinition<T>(newElements));
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public bool Delete(Expression<Func<T, bool>> query)
        {
            try
            {
                collection.DeleteMany<T>(query);
                return true;
            }
            catch (Exception e)
            {

                throw e;
            }
        }     
    }
}
