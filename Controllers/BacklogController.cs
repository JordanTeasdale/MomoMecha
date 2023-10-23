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
    public class BacklogController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public BacklogController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<Backlog>>> Get()
        {
            var model = await _context.Backlogs
                    .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                    .ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult<List<Backlog>>> Post(Backlog backlog)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            backlog.ApplicationUser = user;
            _context.Backlogs.Add(backlog);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Backlog>>> Delete(int id)
        {
            var backlog = await _context.Backlogs.FindAsync(id);
            if (backlog == null)
                return BadRequest("Gundam not found.");

            _context.Backlogs.Remove(backlog);
            await _context.SaveChangesAsync();

            var model = await _context.Backlogs
                .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                .ToListAsync();

            return Ok(model);
        }
    }
}