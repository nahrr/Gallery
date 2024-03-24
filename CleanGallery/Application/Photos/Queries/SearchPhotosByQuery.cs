using MediatR;

namespace Application.Photos.Queries
{
    public record class SearchPhotosByQuery(string Query, int Page) : IRequest<SearchPhotosResponse>;
}
