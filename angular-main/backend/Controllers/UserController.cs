using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register([FromBody] User user)
        {
            Console.WriteLine("Received registration request:");
            Console.WriteLine($"Full Name: {user?.FullName}");
            Console.WriteLine($"Email: {user?.EmailId}");
            Console.WriteLine($"Phone: {user?.MobileNo}");
            Console.WriteLine($"Resume: {user?.ResumeUrl}");

            if (user == null)
            {
                return BadRequest(new { result = false, message = "Invalid user data." });
            }

            if (string.IsNullOrWhiteSpace(user.EmailId))
            {
                return BadRequest(new { result = false, message = "Email is required." });
            }

            // Validate email format
            if (!Regex.IsMatch(user.EmailId, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                return BadRequest(new { result = false, message = "Invalid email address." });
            }

            var existingUser = FakeDb.Users.FirstOrDefault(u => u.EmailId == user.EmailId);
            if (existingUser != null)
            {
                return BadRequest(new { result = false, message = "User already exists." });
            }

            user.IsConfirmed = false;
            FakeDb.Users.Add(user);
            var token = Guid.NewGuid().ToString();
            var confirmationLink = $"http://localhost:5242/api/User/confirm?token={token}";
            var emailService = new EmailService();
            emailService.SendConfirmationEmail(user.EmailId, confirmationLink);

            return Ok(new { result = true, message = "Registration successful." });
        }


        [HttpGet("confirm")]
        public IActionResult ConfirmEmail(string email)
        {
            var user = FakeDb.Users.FirstOrDefault(u => u.EmailId == email);
            if (user == null)
            {
                return NotFound(new { result = false, message = "User not found." });
            }
            user.IsConfirmed = true;
            return Ok(new { result = true, message = "Email confirmed successfully!" });
        }
        [HttpPost("check-email")]
        public IActionResult CheckEmail([FromBody] JsonElement body)
        {
            if (!body.TryGetProperty("emailId", out var emailProperty))
            {
                return BadRequest(new { result = false, message = "Email is required" });
            }

            string email = emailProperty.GetString();

            var user = FakeDb.Users.FirstOrDefault(u => u.EmailId == email);
            if (user == null)
            {
                return NotFound(new { result = false, message = "Invalid email address" });
            }

            return Ok(new { result = true, message = "Email exists" });
        }


    }
}
