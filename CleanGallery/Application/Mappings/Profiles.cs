using Application.Dtos.Response;
using AutoMapper;
using Domain.Entites;

namespace Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<FlickrPhotoDto, PhotoProperties>();
        }
    }
}
