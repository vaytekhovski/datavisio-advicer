using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatavisioAdvicerAPI.Entities
{
    public class User
    {
        public Guid id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string RegistrationDate { get; set; }
    }
}
