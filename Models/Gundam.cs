namespace MomoMecha.Models
{
    public class Gundam
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Series { get; set; }

        public string Grade { get; set; }

        public int Scale { get; set; }

        public ApplicationUser ApplicationUser { get; set; }
    }
}
