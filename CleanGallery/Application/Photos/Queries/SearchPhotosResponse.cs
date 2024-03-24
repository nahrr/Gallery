using Domain.Entites;

namespace Application.Photos.Queries
{
    public record SearchPhotosResponse(int Page, int Pages, int PerPage, int Total, List<Photo> Photos);
}
