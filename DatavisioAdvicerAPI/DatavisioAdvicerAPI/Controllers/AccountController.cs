using DatavisioAdvicerAPI.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DatavisioAdvicerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        // тестовые данные вместо использования базы данных
        private List<UserLogin> people = new List<UserLogin>
        {
            new UserLogin {Login="admin", Password="admin" }
        };

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new
            {
                success = true,
                message = "testIsOk"
            });
        }

        [HttpPost("auth")]
        public IActionResult Token([FromBody]UserLogin userLogin)
        {
            var identity = GetIdentity(userLogin.Login, userLogin.Password);
            if (identity == null)
            {
                return BadRequest(new { 
                    success = false,
                    errorText = "Invalid username or password."
                });
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                success = true,
                access_token = encodedJwt,
                username = identity.Name
            };

            return Ok(response);
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            UserLogin person = people.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }
    }
}
