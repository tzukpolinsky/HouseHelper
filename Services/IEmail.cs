using System;
using System.Collections.Generic;
using System.Text;
using e = Entites;

namespace Services
{
    public interface IEmail
    {
        bool SendErrorEmail(e.User user);
    }
}
