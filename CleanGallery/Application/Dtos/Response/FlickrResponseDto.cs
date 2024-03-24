namespace Application.Dtos.Response
{
    public class FlickrResponseDto
    {
        public string? Stat { get; set; }
        public string? Message { get; set; }
        public FlickrPhotosDto Photos { get; set; } = new();
    }
}
