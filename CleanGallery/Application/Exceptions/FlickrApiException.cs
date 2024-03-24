namespace Application.Exceptions
{
    public class FlickrApiException : Exception
    {
        public FlickrApiException(string error) : base(error) { }
    }
}
