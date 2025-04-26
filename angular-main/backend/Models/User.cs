namespace backend.Models
{
    public class User
    {
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string ResumeUrl { get; set; }
        public bool IsConfirmed { get; set; }
    }

}
