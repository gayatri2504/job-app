using MailKit.Net.Smtp;
using MimeKit;
namespace backend.Services
{
    public class EmailService
    {
        public void SendConfirmationEmail(string toEmail, string confirmationLink)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("NaukriClone", "vasamsettihemakalyani@gmail.com")); // Your sender
            message.To.Add(MailboxAddress.Parse(toEmail));
            message.Subject = "Confirm your email";
            message.Body = new TextPart("plain")
            {
                Text = $"Click this link to confirm your email: {confirmationLink}"
            };
            using var client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, false);
            client.Authenticate("vasamsettihemakalyani@gmail.com", "xnxf frtq cziy wvmo"); // 🔐 Use Gmail App Password
            client.Send(message);
            client.Disconnect(true);
        }
    }
}
