using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MomoMecha.Data;
using MomoMecha.Models;
using MomoMecha.Services;
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
        private readonly PhotoService _photoService;

        public GundamsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, PhotoService photoService)
        {
            _context = context;
            _userManager = userManager;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Gundam>>> Get()
        {
            var model = await _context.Gundams
                    .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                    .ToListAsync();
            return Ok(model);
        }

        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<ActionResult<List<Gundam>>> Get(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var model = await _context.Gundams
                .Where(g => g.ApplicationUser.UserName == user.UserName)
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.Series,
                    g.Grade,
                    g.Scale,
                    g.ImageUrl
                })
            .ToListAsync();

            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult<List<Gundam>>> Post([FromForm] Gundam gundam, IFormFile file)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _photoService.AddPhotoAsync(file);

            gundam.ApplicationUser = user;
            gundam.ImageUrl = result.Url.ToString();
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

            var imageUrl = gundam.ImageUrl;

            _context.Gundams.Remove(gundam);
            await _context.SaveChangesAsync();

            _ = _photoService.DeletePhotoAsync(imageUrl);

            var model = await _context.Gundams
                .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                .ToListAsync();

            return Ok(model);
        }
    }
}