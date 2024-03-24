namespace Domain.Entites
{
    public class Photo
    {
        public string Title { get; set; } = string.Empty;

        public string StandardUrl { get; set; } = string.Empty;

        public string MediumSizeUrl => $"{GetBaseUrl()}_c.jpg";

        public string LargeSizeUrl => $"{GetBaseUrl()}_b.jpg";

        private string GetBaseUrl()
        {
            return StandardUrl.Replace("_size_", "");
        }
    }
}
