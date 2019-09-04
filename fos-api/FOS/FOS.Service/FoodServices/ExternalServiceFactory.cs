﻿using FOS.Model.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FOS.Services.FoodServices
{
    public class ExternalServiceFactory : IExternalServiceFactory
    {
        private IFOSFoodServiceAPIsService _foodServiceAPIsService;
        IFoodService service;
        public ExternalServiceFactory(IFOSFoodServiceAPIsService foodServiceAPIsService)
        {
            this._foodServiceAPIsService = foodServiceAPIsService;
        }
        public string GetFoodServiceById(int id)
        {
            APIs apis = _foodServiceAPIsService.GetById(id);
            service = GetFoodService(apis);
            return service.GetNameService();
            //----------------Test----------------------
            //var re1 = service.GetMetadata().ToList().ToString();
            //Province province = new Province() { id = 217 };
            //var re2 = service.GetRestaurants(province).ToList().ToString();
            //Restaurant restaurant = new Restaurant() { restaurant_id = 595, delivery_id = 607 };
            //var re3 = service.GetRestaurantDeliveryInfor(restaurant);
            //var re4 = service.GetFoods(restaurant);
            //----------------Test----------------------
        }
        public List<Province> GetMetadata()
        {
            return service.GetMetadata();
        }      
        public List<Restaurant> GetRestaurants(Province province)
        {
            return service.GetRestaurants(province);
        }
        public List<DeliveryInfos> GetRestaurantDeliveryInfor(Restaurant restaurant)
        {
            return service.GetRestaurantDeliveryInfor(restaurant);
        }
        public List<DeliveryInfos> GetRestaurantsDeliveryInfor(List<Restaurant> restaurant)
        {
            return service.GetRestaurantsDeliveryInfor(restaurant);
        }
        public List<Food> GetFoods(DeliveryInfos delivery)
        {
            return service.GetFoods(delivery);
        }
        private IFoodService GetFoodService(APIs api)
        {
            switch (api.TypeService)
            {
                case ServiceKind.Now:
                    {
                        return new NowService.NowService(api);
                    }
                case ServiceKind.GrabFood:
                    {
                        return new GrabFoodService.GrabFoodService();
                    }
                default:
                    throw new Exception();
            }
        }


    }
}