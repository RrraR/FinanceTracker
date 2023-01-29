using System.Security.Claims;
using FinanceTracker.Authentication;
using FinanceTracker.Models;
using FinanceTracker.Services.Objects;
using FinanceTracker.Services.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly JwtAuthManager _jwtAuthManager;

        public UserController(IUserService userService, JwtAuthManager jwtAuthManager)
        {
            _userService = userService;
            _jwtAuthManager = jwtAuthManager;
        }
        
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] AuthRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            if (! await _userService.GetUser(request.Username, request.Password))
            {
                return BadRequest();
            }
            
            // var role = _userService.GetUserRole(request.Username);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,request.Username),
                // new Claim(ClaimTypes.Role, role.Result)
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(request.Username, claims, DateTime.Now);
            
            return Ok(new AuthResultObject
            {
                Username = request.Username,
                // Role = role.Result,
                AccessToken = jwtResult.AccessToken,
            });
        }
        
        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult> Register([FromBody] AuthRequestDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            
            if (_userService.IsAnExistingUser(request.Username).Result)
            {
                //user already exists
                return BadRequest();
            }

            var user = await _userService.RegisterUser(request.Username, request.Password);

            // var role = _userService.GetUserRole(user.Username);
            var claims = new[]
            {
                new Claim(ClaimTypes.Name,user.Username),
                // new Claim(ClaimTypes.Role, role.Result)
            };

            var jwtResult = _jwtAuthManager.GenerateTokens(user.Username, claims, DateTime.Now);
            
            return Ok(new AuthResultObject
            {
                Username = user.Username,
                // Role = role.Result,
                AccessToken = jwtResult.AccessToken,
            });
        }
    }
        
        
}
