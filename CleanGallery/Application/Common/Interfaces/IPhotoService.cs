using Application.Dtos.Response;
using Domain.Entites;

namespace Application.Common.Interfaces
{
    public interface IPhotoService
    {
        List<Photo> CreatePhotos(List<FlickrPhotoDto> dto);
    }
}
