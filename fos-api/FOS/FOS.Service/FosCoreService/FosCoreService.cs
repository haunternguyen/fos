﻿using FOS.Services.OrderServices;
using FOS.Services.Providers;
using FOS.Services.SendEmailServices;
using FOS.Services.SPListService;
using FOS.Services.SendEmailServices;
using FOS.Services.SPUserService;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.Utilities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Security;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using FOS.CoreService.Constants;
using FOS.Common.Constants;

namespace FOS.Services.FosCoreService
{
    public class FosCoreService: IFosCoreService
    {
        IOrderService _orderServices;
        ISendEmailService _sendMailService;
        ISPUserService _userService;
        ISPListService _spListService;
       public FosCoreService(IOrderService orderServices, ISendEmailService sendMailServices, ISPUserService userService, ISPListService spListService)
        {
            _orderServices = orderServices;
            _sendMailService = sendMailServices;
            _userService = userService;
            _spListService = spListService;
        }
        public string BuildLink(string link, string text)
        {
            return "<a href=\"" + link + "\">" + text + "</a>";
        }
        public ListItemCollection GetListEventOpened(ClientContext clientContext)
        {
            var web = clientContext.Web;
            var list = web.Lists.GetByTitle(EventConstantWS.EventList);
            CamlQuery getAllEventOpened = new CamlQuery();
            getAllEventOpened.ViewXml =
                @"<View>
                        <Query>
                            <Where>" + 
                                "<Eq>" +
                                    "<FieldRef Name=" + EventConstantWS.EventStatus + "/>" +
                                    "<Value Type='Text'>" + EventStatus.Opened + "</Value>" +
                                "</Eq>" +
                                @"</Where>
                        </Query>
                        <RowLimit>1000</RowLimit>
                    </View>";

            var events = list.GetItems(getAllEventOpened);
            clientContext.Load(events);
            clientContext.ExecuteQuery();

            return events;
        }
        public void ChangeStatusToClose(ClientContext clientContext, ListItem element)
        {
            element[EventConstantWS.EventStatus] = EventStatus.Closed;
            element.Update();
            clientContext.ExecuteQuery();
        }
        public Dictionary<string, string> GetEmailTemplate(string templateLink)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + templateLink;
            string emailTemplateJson = System.IO.File.ReadAllText(path);

            var emailTemplateDictionary = JsonConvert.DeserializeObject<Dictionary<string, string>>(emailTemplateJson);
            return emailTemplateDictionary;
        }
        public void SendEmail(ClientContext clientContext, string fromMail, string toMail, string body, string subject)
        {
            var emailp = new EmailProperties();

            emailp.To = new List<string>() { toMail };
            emailp.From = fromMail;
            emailp.Body = body;
            emailp.Subject = subject;

            Utility.SendEmail(clientContext, emailp);
            clientContext.ExecuteQuery();
        }
        public ClientContext GetClientContext()
        {
            var siteUrl = "https://precio.sharepoint.com/sites/FOS/";
            var loginName = ConfigurationSettings.AppSettings["loginName"];
            var passWord = ConfigurationSettings.AppSettings["passWord"];
            var securePassword = new SecureString();
            passWord.ToCharArray().ToList().ForEach(c => securePassword.AppendChar(c));

            using (var clientContext = new ClientContext(siteUrl))
            {
                clientContext.Credentials = new SharePointOnlineCredentials(loginName, securePassword);
                return clientContext;
            }
        }
        public string Parse<T>(string text, T modelparse)
        {
            return _sendMailService.Parse(text, modelparse);
        }
        public List<Model.Domain.UserNotOrderEmail> GetUserNotOrderEmail(string idEvent)
        {
            List<Model.Domain.UserNotOrderEmail> listUser = _orderServices.GetUserNotOrderEmail(idEvent);
            return listUser;
        }

        public void SendMailRemider(IEnumerable<Model.Dto.UserNotOrderMailInfo> lstUser)
        {
            string path = AppDomain.CurrentDomain.BaseDirectory + EventConstantWS.ReminderEventEmailTemplate;
            string emailTemplateJson = System.IO.File.ReadAllText(path);

            _sendMailService.SendEmailToNotOrderedUserAsync(lstUser, emailTemplateJson);
        }
    }
}
