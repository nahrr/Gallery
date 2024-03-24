using Application.Common.Interfaces;
using Infrastructure.ExternalServices;
using Infrastructure.HttpHandlers;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Settings;
using Application.Common.Caching;
using Infrastructure.Caching;
using Microsoft.Extensions.Configuration;

namespace Infrastructure
{
    public static class ConfigureServices
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.ConfigureOptions<ExternalApiSettingsSetup>();
                configuration.GetSection(nameof(ExternalApiSettingsSetup));
            services.AddScoped<IFlickrApiService, FlickrApiService>();
            services.AddSingleton<ICacheService, CacheService>();
            
            var settings = configuration.GetSection("ExternalApiSettings").Get<ExternalApiSettings>();
       
            services.AddHttpClient("flickrapi").ConfigureHttpClient(client =>
            {
                client.BaseAddress = new Uri(settings?.FlickrBaseUrl ?? string.Empty); 
            })
            .ConfigurePrimaryHttpMessageHandler(() => new HttpClientHandler())
            .AddHttpMessageHandler(() => new FlickrApiHandler(settings?.FlickrApiKey?? string.Empty));

            return services;
        }
    }
}
