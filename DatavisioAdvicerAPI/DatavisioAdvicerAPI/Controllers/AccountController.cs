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

        [HttpPost("auth")]
        public IActionResult Auth([FromBody]User model)
        {
            var identity = GetIdentity(model.Login, model.Password);
            if (identity == null)
            {
                return BadRequest(new { 
                    success = false,
                    errorText = "Invalid username or password."
                });
            }

            var response = new
            {
                success = true,
                access_token = Security.CreateJWT(identity),
                username = identity.Name
            };

            return Ok(response);
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> Create([FromBody] User model)
        {
            User person;
            using(DatabaseContext db = new DatabaseContext())
            {
                person = db.Users.FirstOrDefault(x=>x.Login == model.Login);
                if(person != null)
                {
                    return BadRequest(new
                    {
                        success = false,
                        errorText = "User with this login already created."
                    });
                }
                model.Password = Security.Hash(model.Password);
                await db.Users.AddAsync(model);
                await db.SaveChangesAsync();
            }

            return Auth(model);
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            User person;
            using (DatabaseContext db = new DatabaseContext())
            {
                person = db.Users.FirstOrDefault(x => x.Login == username && x.Password == Security.Hash(password));
            }
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
