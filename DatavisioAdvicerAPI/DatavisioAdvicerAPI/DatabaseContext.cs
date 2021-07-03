using DatavisioAdvicerAPI.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatavisioAdvicerAPI
{
    public class DatabaseContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<EmulationHistoryEntity> EmulationHistories { get; set; }

        public DatabaseContext()
        {
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql("Server=157.230.97.233;Port=6606;Database=DatavisioAdvicer;Uid=pro;Pwd=rsE>9S^2Fu:kNVc:", new MySqlServerVersion(new Version(8, 0, 11)));
        }
    }
}
