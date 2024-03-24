using Application.Common.Interfaces;

namespace Infrastructure.Settings
{
    public sealed class ExternalApiSettings : IExternalApiSettings
    {
        public string FlickrApiKey { get; set; } = string.Empty;
        public string FlickrBaseUrl { get; set; } = string.Empty;
        public string FlickrRequestFailure { get; set; } = string.Empty;
        public string PhotosPerPage { get; set; } = string.Empty;
        public string FlickrSearchPhotoUri { get; set; } = string.Empty;
    }
}
