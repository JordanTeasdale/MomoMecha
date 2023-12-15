namespace MomoMecha.Models
{
    public class FavoriteUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
