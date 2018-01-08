﻿using PixelBattles.Server.DataStorage.Models;
using System;

namespace PixelBattles.Server.BusinessLogic.Models
{
    public class Battle
    {
        public Guid BattleId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }
    }

    public partial class BusinessLogicMappingProfile
    {
        private void InitializeBattle()
        {
            CreateMap<BattleEntity, Battle>();
        }
    }
}
