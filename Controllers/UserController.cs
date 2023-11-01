using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MomoMecha.Data;
using MomoMecha.Models;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace MomoMecha.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JsonSerializerOptions jsonSerializerOptions;

        public UserController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

            jsonSerializerOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve
            };
        }

        [HttpGet("{username}/gundam")]
        public async Task<ActionResult<List<Gundam>>> GetGundam(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userGundam = await _context.Gundams
                .Where(b => b.ApplicationUser.UserName == user.UserName)
                .Select(b => new
                {
                    b.Name,
                    b.Series,
                    b.Grade,
                    b.Scale,
                    b.ImageUrl
                })
                .ToListAsync();

            var serializedGundam = JsonSerializer.Serialize(userGundam, jsonSerializerOptions);

            return Ok(serializedGundam);
        }

        [HttpGet("{username}/backlog")]
        public async Task<ActionResult<List<Backlog>>> GetBacklog(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userBacklog = await _context.Backlogs
                .Where(b => b.ApplicationUser.UserName == user.UserName)
                .Select(b => new
                {
                    b.Name,
                    b.Series,
                    b.Grade,
                    b.Scale
                })
                .ToListAsync();

            var serializedBacklog = JsonSerializer.Serialize(userBacklog, jsonSerializerOptions);

            return Ok(serializedBacklog);
        }

        [HttpGet("{username}/wishlist")]
        public async Task<ActionResult<List<WishList>>> GetWishList(string username)
        {
            var user = await _userManager.FindByNameAsync(username);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var userWishList = await _context.WishList
                .Where(b => b.ApplicationUser.UserName == user.UserName)
                .Select(b => new
                {
                    b.Name,
                    b.Series,
                    b.Grade,
                    b.Scale
                })
                .ToListAsync();

            var serializedWishList = JsonSerializer.Serialize(userWishList, jsonSerializerOptions);

            return Ok(serializedWishList);
        }
    }
}
