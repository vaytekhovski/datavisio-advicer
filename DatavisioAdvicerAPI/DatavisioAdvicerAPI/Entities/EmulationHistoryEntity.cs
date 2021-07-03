using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatavisioAdvicerAPI.Entities
{
    public class EmulationHistoryEntity
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Exchange { get; set; }
        public string Currency { get; set; }
        public string Dates { get; set; }
        public string Search { get; set; }
        public double Profit { get; set; }
    }
}
