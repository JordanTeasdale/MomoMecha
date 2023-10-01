using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomoMecha.Data;
using MomoMecha.Models;
using System.Security.Claims;

namespace MomoMecha.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GundamsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public GundamsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<Gundam>>> Get()
        {
            var model = await _context.Gundams
                    .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                    .ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult<List<Gundam>>> Post(Gundam gundam)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            gundam.ApplicationUser = user;
            _context.Gundams.Add(gundam);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Gundam>>> Delete(int id)
        {
            var gundam = await _context.Gundams.FindAsync(id);
            if (gundam == null)
                return BadRequest("Gundam not found.");

            _context.Gundams.Remove(gundam);
            await _context.SaveChangesAsync();

            var model = await _context.Gundams
                .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                .ToListAsync();

            return Ok(model);
        }
    }
}
