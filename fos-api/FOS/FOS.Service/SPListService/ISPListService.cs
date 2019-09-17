﻿using FOS.Model.Domain;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FOS.Services.SPListService
{
    public interface ISPListService
    {
        Task AddListItem(string id, JsonRequest item);
        string AddEventListItem(string id, Model.Domain.Event eventItem);
        Task UpdateListItem(string id, Model.Domain.Event eventItem);
        Task UpdateEventParticipant(string id, Model.Dto.GraphUser participant);
         Task UpdateEventIsReminder(string idEvent, string isReminder);
    }
}
