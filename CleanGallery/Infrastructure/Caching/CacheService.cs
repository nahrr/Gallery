using Application.Common.Caching;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace Infrastructure.Caching
{
    public class CacheService : ICacheService
    {
        private readonly IDistributedCache _cache;

        public CacheService(IDistributedCache cache)
        {
            _cache = cache;
        }

        public async Task<T?> GetAsync<T>(string key, CancellationToken cancellation = default) where T : class
        {
            var cachedValue = await _cache.GetStringAsync(key, cancellation);

            if (cachedValue is null)
            {
                return null;
            }

            var value = JsonSerializer.Deserialize<T>(cachedValue);

            return value;
        }

        public async Task SetAsync<T>(string key, T value, CancellationToken cancellation = default) where T : class
        {
            var options = new DistributedCacheEntryOptions
            {
                SlidingExpiration = TimeSpan.FromMinutes(20),
            };

            var cachedValue = JsonSerializer.Serialize(value);

            await _cache.SetStringAsync(key, cachedValue, options, cancellation);
        }
    }
}
