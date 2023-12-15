using Microsoft.AspNetCore.Identity;

namespace MomoMecha.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Gundam> Gundams { get; set; }
        public List<Backlog> Backlogs { get; set; }
        public List<WishList> WishList { get; set; }
        public List<FavoriteUser> FavoriteUsers { get; set; }
    }
}