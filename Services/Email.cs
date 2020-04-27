using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using e = Entites;

namespace Services
{
    public class Email: IEmail
    {
        public bool SendErrorEmail(e.User user)
        {
            MailMessage message = new MailMessage();
            message.Subject = "קרתה תקלה למשתמש :" + user.UserName + " " + user.Name;
            message.Body = "התקלה קרתה בזמן : " + DateTime.Now;
            return sendMail(message);
        }
        public void NewUserEmail(e.User user)
        {
            MailMessage message = new MailMessage();
            message.Subject = "משתמש חדש :" + user.UserName + " " + user.Name;
            sendMail(message);
        }
        private bool sendMail(MailMessage message)
        {
            SmtpClient client = new SmtpClient();
            try
            {
                var Emailsettings = new Utilities().GetSettings().GetSection("Email");
                client.Host = Emailsettings.GetSection("Host").Value;
                client.Port = Convert.ToInt32(Emailsettings.GetSection("Port").Value);
                client.EnableSsl = Convert.ToBoolean(Emailsettings.GetSection("EnableSsl").Value);
                client.UseDefaultCredentials = Convert.ToBoolean(Emailsettings.GetSection("UseDefaultCredentials").Value);
                client.Credentials = new NetworkCredential(Emailsettings.GetSection("Credentials:UserName").Value, Emailsettings.GetSection("Credentials:Password").Value);
                message.From = new MailAddress(Emailsettings.GetSection("MailFrom").Value);
                message.To.Add(Emailsettings.GetSection("MailTo").Value);
                client.Send(message);
                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                client.Dispose();
            }
        }
    }
}
