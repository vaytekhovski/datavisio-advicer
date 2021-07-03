using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatavisioAdvicerAPI.Models
{
    public class ChangePasswordModel
    {
        public Guid id { get; set; }
        public string oldPassword { get; set; }
        public string newPassword { get; set; }
    }
}
