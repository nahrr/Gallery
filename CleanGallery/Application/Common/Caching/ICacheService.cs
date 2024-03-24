namespace Application.Common.Caching
{
    public interface ICacheService
    {
        Task<T?> GetAsync<T>(string key, CancellationToken cancellation = default)
            where T : class;

        Task SetAsync<T>(string key, T value, CancellationToken cancellation = default)
            where T : class;
    }
}
