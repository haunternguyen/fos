﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FOS.Repositories.DataModel
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public int IdUser { get; set; }
        public int IdRestaurant { get; set; }
        public int IdDelivery { get; set; }
        public string FoodDetail { get; set; }
    }
}
