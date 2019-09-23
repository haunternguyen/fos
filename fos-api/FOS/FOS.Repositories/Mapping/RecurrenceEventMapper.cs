﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FOS.Model.Domain;
using FOS.Repositories.DataModel;

namespace FOS.Repositories.Mapping
{
    public interface IRecurrenceEventMapper
    {
        Model.Domain.RecurrenceEvent MapToDomain(DataModel.RecurrenceEvent efObject);
        void MapToEfObject(DataModel.RecurrenceEvent efObject, Model.Domain.RecurrenceEvent domObject);
    }
    public class RecurrenceEventMapper : IRecurrenceEventMapper
    {
        public Model.Domain.RecurrenceEvent MapToDomain(DataModel.RecurrenceEvent efObject)
        {
            return new Model.Domain.RecurrenceEvent()
            {
                Id = efObject.Id,
                Title = efObject.Title,
                TypeRepeat = (RepeateType)Enum.Parse(typeof(RepeateType), efObject.TypeRepeat),
                EndDate = DateTime.Parse(efObject.EndDate),
                StartDate = DateTime.Parse(efObject.StartDate),
                UserId = efObject.UserId != null ? efObject.UserId : null,
                StartTempDate = efObject.StartTempDate != null ? DateTime.Parse(efObject.StartTempDate): DateTime.Parse(efObject.StartDate),
                Version = efObject.Version,
                UserMail = efObject.UserMail
            };
        }

        public void MapToEfObject(DataModel.RecurrenceEvent efObject, Model.Domain.RecurrenceEvent domObject)
        {
            efObject.Id = domObject.Id;
            efObject.Title = domObject.Title;
            efObject.TypeRepeat = domObject.TypeRepeat.ToString();
            efObject.StartDate = domObject.StartDate.ToString();
            efObject.EndDate = domObject.EndDate.ToString();
            efObject.UserId = domObject.UserId != null ? domObject.UserId : null;
            efObject.Version = domObject.Version;
            efObject.StartTempDate = domObject.StartTempDate.ToString();
            efObject.UserMail = domObject.UserMail;

        }
    }
}