﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FOS.Model.Domain
{
    public class GraphUser
    {
        public string Id { get; set; }
        public string Mail { get; set; }
        public string DisplayName { get; set; }
        public string UserPrincipalName { get; set; }
    }
}
