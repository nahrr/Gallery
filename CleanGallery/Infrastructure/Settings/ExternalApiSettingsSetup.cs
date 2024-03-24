using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Infrastructure.Settings
{
    public class ExternalApiSettingsSetup : IConfigureOptions<ExternalApiSettings>
    {
        private readonly IConfiguration _configuration;

        public ExternalApiSettingsSetup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void Configure(ExternalApiSettings settings)
        {
            _configuration.GetSection(nameof(ExternalApiSettings)).Bind(settings);
        }
    }
}
