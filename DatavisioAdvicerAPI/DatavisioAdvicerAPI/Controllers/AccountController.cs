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
            User person;
            using (DatabaseContext db = new DatabaseContext())
            {
                person = db.Users.FirstOrDefault(x => x.Login == model.Login && x.Password == Security.Hash(model.Password));
            }

            var identity = CreateClaims(person);
            if (identity == null)
            {
                return BadRequest(new { 
                    success = false,
                    errorText = "Invalid username or password."
                });
            }

            return Ok(new
            {
                success = true,
                access_token = Security.CreateJWT(identity),
                username = identity.Name
            });
        }

        [HttpPost("sign-up")]
        public async Task<IActionResult> Create([FromBody] User model)
        {
            User person = model;
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

            var identity = CreateClaims(person);
            if (identity == null)
            {
                return BadRequest(new
                {
                    success = false,
                    errorText = "Invalid username or password."
                });
            }

            return Ok(new
            {
                success = true,
                access_token = Security.CreateJWT(identity),
                username = identity.Name
            });
        }

        private ClaimsIdentity CreateClaims(User person)
        {
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

            return null;
        }
    }
}
