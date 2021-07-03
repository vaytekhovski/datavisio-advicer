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
        [HttpGet("history")]
        public async Task<IActionResult> GetHistory(Guid userId)
        {
            List<EmulationHistoryEntity> history = new List<EmulationHistoryEntity>();
            try
            {
                using (DatabaseContext db = new DatabaseContext())
                {
                    history = db.EmulationHistories.Where(x => x.UserId == userId).ToList();
                }
            }
            catch (Exception e)
            {
                return BadRequest(new
                {
                    success = false,
                    errorMessage = e.Message
                });
            }

            return Ok(new
            {
                success = true,
                history = history,
            });
        }

        [HttpPost("History")]
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
