using System.ComponentModel.DataAnnotations;

namespace MomoMecha.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal SalePrice { get; set; }
        public string PictureUrl { get; set; }
        public string Link { get; set; }
    }
}
