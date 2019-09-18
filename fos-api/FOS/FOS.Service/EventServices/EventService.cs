﻿using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FOS.Services.Providers;
using FOS.Model.Util;
using FOS.Common;
using System.Net.Http;
using System.Web.Script.Serialization;
using System.Dynamic;
using FOS.Model.Dto;
using FOS.Model.Mapping;
using FOS.Common.Constants;

namespace FOS.Services.EventServices
{
    public class EventService : IEventService
    {
        IGraphApiProvider _graphApiProvider;
        ISharepointContextProvider _sharepointContextProvider;
        IEventDtoMapper _eventDtoMapper;
        public EventService(IGraphApiProvider graphApiProvider, ISharepointContextProvider sharepointContextProvider, IEventDtoMapper eventDtoMapper)
        {
            _graphApiProvider = graphApiProvider;
            _sharepointContextProvider = sharepointContextProvider;
            _eventDtoMapper = eventDtoMapper;
        }
        public IEnumerable<Event> GetAllEvent(string userId)
        {
            using (ClientContext clientContext = _sharepointContextProvider.GetSharepointContextFromUrl(APIResource.SHAREPOINT_CONTEXT + "sites/FOS/"))
            {
                var web = clientContext.Web;
                var list = web.Lists.GetByTitle(EventFieldName.EventList);
                clientContext.Load(list);
                clientContext.ExecuteQuery();

                var collListItem = list.GetItems(CamlQuery.CreateAllItemsQuery());
                clientContext.Load(collListItem);
                clientContext.ExecuteQuery();

                var listEvent = new List<Event>();
                foreach (var element in collListItem)
                {
                    var eventModel = _eventDtoMapper.ListItemToEventModel(element);

                    var isParticipant = eventModel.EventParticipantsJson.Contains(userId);
                    var isHost = eventModel.HostId == userId;

                    eventModel.IsMyEvent = isParticipant
                        || isHost
                        || eventModel.CreatedBy == userId;

                    eventModel.Action = new EventAction
                    {
                        CanViewEvent = true,
                        CanEditEvent = isHost && eventModel.Status == EventStatus.Opened,
                        CanCloseEvent = isHost && eventModel.Status == EventStatus.Opened,
                        CanSendRemind = isHost && eventModel.Status == EventStatus.Opened,
                        CanMakeOrder =
                            (isParticipant || eventModel.EventType == EventType.Open) 
                            && eventModel.Status == EventStatus.Opened,
                        CanViewOrder = eventModel.Status == EventStatus.Closed && isParticipant
                    };

                    listEvent.Add(eventModel);
                }
                return listEvent;
            }
        }

        public Event GetEvent(int id)
        {
            using (ClientContext clientContext = _sharepointContextProvider.GetSharepointContextFromUrl(APIResource.SHAREPOINT_CONTEXT + "sites/FOS/"))
            {
                var web = clientContext.Web;
                var list = web.Lists.GetByTitle(EventFieldName.EventList);
                clientContext.Load(list);
                clientContext.ExecuteQuery();

                var item = list.GetItemById(id);
                clientContext.Load(item);
                clientContext.ExecuteQuery();

                var result = _eventDtoMapper.ListItemToEventModel(item);

                return result;
            }
        }
    }
}