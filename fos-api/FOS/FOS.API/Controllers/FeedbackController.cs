﻿using FOS.API.App_Start;
using FOS.Common.Constants;
using FOS.Model.Domain;
using FOS.Model.Mapping;
using FOS.Model.Util;
using FOS.Services.EventServices;
using FOS.Services.FeedbackServices;
using FOS.Services.OrderServices;
using FOS.Services.SendEmailServices;
using FOS.Services.SPUserService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace FOS.API.Controllers
{
    [LogActionWebApiFilter]
    [RoutePrefix("api/feedback")]
    public class FeedbackController : ApiController
    {
        private IFeedbackService _feedbackService;
        private IFeedbackDtoMapper _feedbackDtoMapper;
        private ISendEmailService _sendEmailService;
        private IOrderService _orderService;
        private IEventService _eventService;
        private readonly ISPUserService _spUserService;
        public FeedbackController(IFeedbackService feedbackService, IFeedbackDtoMapper feedbackDtoMapper, ISendEmailService sendEmailService, IOrderService orderService, IEventService eventService, ISPUserService userService)
        {
            _feedbackService = feedbackService;
            _feedbackDtoMapper = feedbackDtoMapper;
            _sendEmailService = sendEmailService;
            _orderService = orderService;
            _eventService = eventService;
            _spUserService = userService;
        }
        [HttpGet]
        [Route("GetById/{id}")]
        public ApiResponse<Model.Dto.FeedBack> GetFeedbackByDeliveryId(string id)
        {
            try
            {
                var feedback = _feedbackService.GetFeedbackByDeliveryId(id);
                if (feedback != null)
                {
                    return ApiUtil<Model.Dto.FeedBack>.CreateSuccessfulResult(_feedbackDtoMapper.ToDto(feedback));
                }
                return ApiUtil<Model.Dto.FeedBack>.CreateSuccessfulResult(null);
            }
            catch (Exception e)
            {
                return ApiUtil<Model.Dto.FeedBack>.CreateFailResult(e.ToString());
            }
        }
        [HttpPost]
        [Route("rate")]
        public ApiResponse RateRestaurant([FromBody]Model.Dto.FeedBack feedBack)
        {
            try
            {
                _feedbackService.RateRestaurant(_feedbackDtoMapper.ToDomain(feedBack));
                return ApiUtil.CreateSuccessfulResult();
            }
            catch (Exception e)
            {
                return ApiUtil.CreateFailResult(e.ToString());
            }
        }
        [HttpGet]
        [Route("sendEmail/{eventId}")]
        public async Task<ApiResponse> SendFeedbackEmail(string eventId)
        {
            try
            {
                var id = Int32.Parse(eventId);
                var isHost = await _spUserService.ValidateIsHost(id);
                if (!isHost)
                {
                    return ApiUtil<IEnumerable<Model.Dto.UserNotOrder>>.CreateFailResult(Constant.UserNotPerission);
                }

                var listUser = await _orderService.GetUserAlreadyOrderEmail(eventId);
                string path = System.Web.HttpContext.Current.Server.MapPath(Constant.FeedbackEmailTemplate);
                string emailTemplateJson = System.IO.File.ReadAllText(path);

                var listMailInfo = new List<Model.Dto.UserFeedbackMailInfo>();
                foreach (var user in listUser)
                {
                    var orderGuid = new Guid(user.OrderId);
                    var order = _orderService.GetOrder(orderGuid);
                    var thisUser = await _spUserService.GetUserById(order.IdUser);

                    var feedBackMailInfo = new Model.Dto.UserFeedbackMailInfo();
                    feedBackMailInfo.UserMail = user.UserEmail;
                    feedBackMailInfo.OrderId = user.OrderId;
                    Event eventData = _eventService.GetEvent(Int32.Parse(eventId));
                    feedBackMailInfo.EventTitle = eventData.Name;
                    feedBackMailInfo.EventRestaurant = eventData.Restaurant;
                    feedBackMailInfo.UserName = thisUser.DisplayName;
                    listMailInfo.Add(feedBackMailInfo);
                }
                await _sendEmailService.SendEmailToAlreadyOrderedUserAsync(listMailInfo, emailTemplateJson);
                return ApiUtil.CreateSuccessfulResult();
            }
            catch (Exception e)
            {
                return ApiUtil.CreateFailResult(e.ToString());
            }
        }
        [HttpGet]
        [Route("GetByFoodId/{foodId}")]
        public ApiResponse<List<Model.Dto.FeedBack>> GetByFoodId(string foodId)
        {
            try
            {
                List<Model.Domain.FeedBack> feedback = _feedbackService.GetByFoodId(foodId);
                if (feedback != null)
                {
                    List<Model.Dto.FeedBack> listDto = feedback.Select(f => _feedbackDtoMapper.ToDto(f)).ToList();
                    return ApiUtil<List<Model.Dto.FeedBack>>.CreateSuccessfulResult(listDto);
                }
                return ApiUtil<List<Model.Dto.FeedBack>>.CreateSuccessfulResult(null);
            }
            catch (Exception e)
            {
                return ApiUtil<List<Model.Dto.FeedBack>>.CreateFailResult(e.ToString());
            }
        }
    }
}
