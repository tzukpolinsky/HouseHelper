using Data;
using Isopoh.Cryptography.Argon2;
using System;
using System.Collections.Generic;
using System.Text;
using e = Entites;

namespace Services
{
    public class User: IUser
    {
        private readonly IMongoContext<e.User> mongo;

        public User()
        {
            mongo = new MongoContext<e.User>("users");
        }
        public e.User GetByUserName(e.User user)
        {
            return mongo.Find(u => u.UserName == user.UserName)[0];
        }
        public (bool isSuccess, string msg) Create(e.User user)
        {
            if (mongo.Find(u => u.UserName == user.UserName).Count == 0)
            {
                var password = Encoding.UTF8.GetString(Convert.FromBase64String(user.Password));
                user.Password = Argon2.Hash(password);
                var result = mongo.Insert(user);
                if (result)
                {
                    new Email().NewUserEmail(user);
                }
                return (result, "המשתמש נוצר בהצלחה");
            }
            else
            {
                return (false, "המשתמש כבר קיים");
            }

        }
        public (bool isSuccess, string msg, e.User user) Login(e.User user)
        {
            var mongoUser = mongo.Find(u => u.UserName == user.UserName);
            if (mongoUser == null && mongoUser.Count == 0)
            {
                return (false, "לא קיים משתמש ברשות שנבחרה", null);
            }
            if (mongoUser.Count == 1)
            {
                var userFromMongo = mongoUser[0];
                var password = Encoding.UTF8.GetString(Convert.FromBase64String(user.Password));
                var verified = Argon2.Verify(userFromMongo.Password, password);
                return (verified, verified ? "ההתחברות בוצעה בהצלחה" : "פרטי המשתמש אינם תקינים", new e.User
                {
                    Name = userFromMongo.Name,
                    UserName = userFromMongo.UserName,
                    Email = userFromMongo.Email,
                });
            }
            return (false, "היוזר אינו פעיל", null);
        }
    }
}
