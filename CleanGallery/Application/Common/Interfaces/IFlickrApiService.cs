using Application.Dtos.Response;

namespace Application.Common.Interfaces
{
    public interface IFlickrApiService
    {
        Task<FlickrResponseDto> GetPhotosAsync(string query, int page);
    }
}
