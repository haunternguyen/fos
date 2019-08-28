﻿using FOS.Model.Dto;
using FOS.Services.ExternalServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FOS.Services.ProvinceServices
{
    public class ProvinceService : IProvinceService
    {
        IExternalServiceFactory _craw;
        int IdService;
        public ProvinceService(IExternalServiceFactory craw)
        {
            _craw = craw;
        }
        public string GetExternalServiceById(int IdService)
        {
            this.IdService = IdService;
            return "ProvinceService in " + _craw.GetExternalServiceById(IdService) + "is ready";
        }

        public List<FoodCategory> GetFoodCatalogues(DeliveryInfos delivery)
        {
            return _craw.GetFoodCatalogues(delivery);
        }


        public List<Province> GetMetadataForProvince()
        {
            return _craw.GetMetadataForProvince();
        }

        public Province GetMetadataById(int city_id)
        {
            var listProvinces = GetMetadataForProvince();
            return listProvinces.Where(p => p.id == city_id.ToString()).FirstOrDefault();
        }

        public List<DeliveryInfos> GetRestaurantDeliveryInfor(Restaurant restaurant)
        {
            return _craw.GetRestaurantDeliveryInfor(restaurant);
        }

        public List<Restaurant> GetRestaurants(Province province, string keyword, List<RestaurantCategory> categories)
        {
            return _craw.GetRestaurants(province, keyword, categories);
        }

        public List<DeliveryInfos> GetRestaurantsDeliveryInfor(List<Restaurant> restaurant)
        {
            return _craw.GetRestaurantsDeliveryInfor(restaurant);
        }

        public List<RestaurantCategory> GetMetadataForCategory()
        {
            return _craw.GetMetadataForCategory();
        }
    }
}