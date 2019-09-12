﻿using FOS.API.App_Start;
using FOS.Common.Constants;
using FOS.Model.Domain;
using FOS.Model.Dto;
using FOS.Model.Util;
using FOS.Services.SendEmailServices;
using Glimpse.AspNet.Tab;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace FOS.API.Controllers
{
    [LogActionWebApiFilter]
    public class SendEmailController : ApiController
    {
        ISendEmailService _sendEmailService;
        public SendEmailController(ISendEmailService sendEmailService)
        {
            _sendEmailService = sendEmailService;
        }
        [HttpGet]
        [Route("SendEmail")]
        public async Task<ApiResponse> GetIdsAsync(string eventId)
        {
            try
            {
                string path  = System.Web.HttpContext.Current.Server.MapPath(Constant.email_template);
                string html = System.IO.File.ReadAllText(path);
                await _sendEmailService.SendEmailAsync(eventId, html);
                return ApiUtil.CreateSuccessfulResult();
            }
            catch (Exception e)
            {
                return ApiUtil.CreateFailResult(e.ToString());
            }
        }
        [HttpPut]
        [Route("SendEmailToNotOrderedUser")]
        public async Task<ApiResponse> SendEmailToNotOrderedUser([FromBody]IEnumerable<UserNotOrderMailInfo> users)
        {
            try
            {
                string path = System.Web.HttpContext.Current.Server.MapPath(Constant.RemindEventEmailTemplate);
                string emailTemplateJson = System.IO.File.ReadAllText(path);
                await _sendEmailService.SendEmailToNotOrderedUserAsync(users, emailTemplateJson);
                return ApiUtil.CreateSuccessfulResult();
            }
            catch (Exception e)
            {
                return ApiUtil.CreateFailResult(e.ToString());
            }
        }
        // GET: api/SendEmail
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/SendEmail/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/SendEmail
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/SendEmail/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/SendEmail/5
        public void Delete(int id)
        {
        }
    }
}