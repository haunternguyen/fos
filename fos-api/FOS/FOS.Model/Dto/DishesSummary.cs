﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FOS.Model.Dto
{
    public class DishesSummary
    {
        public int Rank { get; set; }
        public string Food { get; set; }
        public float Percent { get; set; }
        public float RelativePercent { get; set; }
        public int AppearTime { get; set; }
        public int FoodId { get; set; }
    }
}
