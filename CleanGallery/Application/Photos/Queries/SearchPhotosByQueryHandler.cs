using Application.Common.Caching;
using Application.Common.Interfaces;
using Application.Exceptions;
using MediatR;

namespace Application.Photos.Queries
{
    public class SearchPhotosByQueryHandler : IRequestHandler<SearchPhotosByQuery, SearchPhotosResponse>
    {
        private readonly IFlickrApiService _flickrApiService;
        private readonly IPhotoService _photoService;
        private readonly ICacheService _cacheService;

        public SearchPhotosByQueryHandler(
            IFlickrApiService flickrApiService,
            IPhotoService photoService,
            ICacheService cacheService)
        {
            _flickrApiService = flickrApiService;
            _photoService = photoService;
            _cacheService = cacheService;
        }

        public async Task<SearchPhotosResponse> Handle(
            SearchPhotosByQuery request,
            CancellationToken cancellationToken)
        {

            SearchPhotosResponse? cachedPhotos = await _cacheService
                .GetAsync<SearchPhotosResponse>(string.Concat(request.Query, request.Page), cancellationToken);

            if (cachedPhotos is not null)
            {
                return cachedPhotos;
            }

            var response = await _flickrApiService.GetPhotosAsync(request.Query, request.Page);

            if (response.Photos.Total == 0)
            {
                throw new NotFoundException($"No search hits for the query {request.Query}");
            }

            var photos = _photoService.CreatePhotos(response.Photos.Photo);

            var searchPhotosResponse = new SearchPhotosResponse(
                response.Photos.Page,
                response.Photos.Pages,
                response.Photos.PerPage,
                response.Photos.Total,
                photos);

            await _cacheService.SetAsync(
                string.Concat(request.Query, request.Page), searchPhotosResponse, cancellationToken);

            return searchPhotosResponse;
        }
    }
}
