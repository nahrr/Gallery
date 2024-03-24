using Application.Common.Interfaces;
using Application.Dtos.Response;
using AutoMapper;
using Domain.Entites;

namespace Application.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IMapper _mapper;
        public PhotoService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public List<Photo> CreatePhotos(List<FlickrPhotoDto> dto)
        {
            var photosProps = _mapper.Map<List<PhotoProperties>>(dto);

            var photos = photosProps.Select(photo =>
                new Photo
                {
                    Title = photo.Title,
                    StandardUrl = $"https://live.staticflickr.com/{photo.Server}/{photo.Id}_{photo.Secret}_size_"
                })
                .ToList();

            return photos;
        }
    }
}
