using Microsoft.AspNetCore.Identity;

namespace MomoMecha.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Gundam> Gundams { get; set; }
    }
}