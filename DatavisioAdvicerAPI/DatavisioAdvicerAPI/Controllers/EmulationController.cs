using DatavisioAdvicerAPI.Entities;
using DatavisioAdvicerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatavisioAdvicerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmulationController : ControllerBase
    {
        [HttpPost("addHistory")]
        public async Task<IActionResult> AddHistory(EmulationHistoryEntity model)
        {
            try
            {
                using (DatabaseContext db = new DatabaseContext())
                {
                    await db.EmulationHistories.AddAsync(model);
                    await db.SaveChangesAsync();
                }
            }
            catch(Exception e)
            {
                return BadRequest(new
                {
                    success = false,
                    errorMessage = e.Message
                });
            }

            return Ok(new
            {
                success = true
            });
        }
    }
}
