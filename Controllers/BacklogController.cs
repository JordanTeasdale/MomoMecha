using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomoMecha.Data;
using MomoMecha.Models;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;

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

        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<ActionResult<List<Backlog>>> Get(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var model = await _context.Backlogs
                .Where(b => b.ApplicationUser.UserName == user.UserName)
                .Select(b => new
                {
                    b.Id,
                    b.Name,
                    b.Series,
                    b.Grade,
                    b.Scale
                })
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