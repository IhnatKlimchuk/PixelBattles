﻿using PixelBattles.Server.DataStorage.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace PixelBattles.Server.DataStorage.Stores
{
    public interface IHubStore : IStore<HubEntity>
    {
        Task<HubEntity> GetHubAsync(Guid hubId, CancellationToken cancellationToken = default(CancellationToken));
    }
}
