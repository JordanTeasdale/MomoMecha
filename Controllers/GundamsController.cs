using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomoMecha.Data;
using MomoMecha.Models;
using System.Security.Claims;

namespace MomoMecha.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GundamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GundamsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Gundam>>> Get()
        {
            var model = await _context.Gundams
                    .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                    .ToListAsync();
            return Ok(model);
        }
    }
}
