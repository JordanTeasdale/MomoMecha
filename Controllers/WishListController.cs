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
    public class WishListController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public WishListController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<List<WishList>>> Get()
        {
            var model = await _context.WishList
                    .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                    .ToListAsync();
            return Ok(model);
        }

        [HttpPost]
        public async Task<ActionResult<List<WishList>>> Post(WishList wishList)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId);

            wishList.ApplicationUser = user;
            _context.WishList.Add(wishList);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<WishList>>> Delete(int id)
        {
            var wishlist = await _context.WishList.FindAsync(id);
            if (wishlist == null)
                return BadRequest("Gundam not found.");

            _context.WishList.Remove(wishlist);
            await _context.SaveChangesAsync();

            var model = await _context.WishList
                .Where(a => a.ApplicationUser.Id == HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value)
                .ToListAsync();

            return Ok(model);
        }
    }
}