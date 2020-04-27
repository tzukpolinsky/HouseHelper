using System;
using System.Collections.Generic;
using System.Text;
using e = Entites;

namespace Services
{
    public interface IUser
    {
        (bool isSuccess, string msg) Create(e.User user);
        (bool isSuccess, string msg, e.User user) Login(e.User user);
    }
}
