namespace Application.Dtos.Response
{
    public class FlickrPhotosDto
    {
        public int Page { get; set; }
        public int Pages { get; set; }
        public int PerPage { get; set; }
        public int Total { get; set; }
        public List<FlickrPhotoDto> Photo { get; set; } = new();
    }
}
