using Application.Common.Interfaces;
using Application.Dtos.Response;
using Application.Exceptions;
using Infrastructure.Settings;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;

namespace Infrastructure.ExternalServices
{
    public class FlickrApiService : IFlickrApiService
    {
        private readonly HttpClient _httpClient;
        private readonly IExternalApiSettings _settings;

        public FlickrApiService(IHttpClientFactory httpClientFactory, IOptions<ExternalApiSettings> settings)
        {
            _httpClient = httpClientFactory.CreateClient("flickrapi");
            _settings = settings.Value;
        }

        public async Task<FlickrResponseDto> GetPhotosAsync(string query, int page)
        {
            var requestUri = BuildRequestUri(query, page);
            var request = await _httpClient.GetAsync(requestUri);

            var responseContent = await request.Content.ReadAsStringAsync();
            var response = JsonSerializer.Deserialize<FlickrResponseDto>(responseContent, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
                ?? throw new FlickrApiException("An external unhandled error has occured");

            if (response.Stat == _settings.FlickrRequestFailure)
            {
                throw new FlickrApiException(response.Message ?? "An external unhandled error has occured");
            }
           
            return response;
        }

        private string BuildRequestUri(string query, int page)
        {
            var uri = _settings.FlickrSearchPhotoUri;
            var builder = new StringBuilder(uri);
            builder.Replace("[query]", query);
            builder.Replace("[page]", page.ToString());
            builder.Replace("[perPage]", _settings.PhotosPerPage);
            return builder.ToString();
        }
    }
}
