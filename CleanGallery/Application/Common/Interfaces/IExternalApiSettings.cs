namespace Application.Common.Interfaces
{
    public interface IExternalApiSettings
    {
        string FlickrApiKey { get; }
        string FlickrBaseUrl { get; }
        string FlickrRequestFailure { get; }
        string PhotosPerPage { get; }
        string FlickrSearchPhotoUri { get; }
    }
}
