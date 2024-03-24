using Application.Common.Caching;
using Application.Common.Interfaces;
using Application.Dtos.Response;
using Application.Exceptions;
using Application.Photos.Queries;
using Domain.Entites;
using Moq;

namespace Application.UnitTests
{
    public class SearchPhotosByQueryHandlerTests
    {
        private readonly Mock<IFlickrApiService> _flickrApiServiceMock;
        private readonly Mock<IPhotoService> _photoServiceMock;
        private readonly Mock<ICacheService> _cacheServiceMock;

        public SearchPhotosByQueryHandlerTests()
        {
            _flickrApiServiceMock = new();
            _photoServiceMock = new();
            _cacheServiceMock = new();
        }

        [Fact]
        public async Task Handle_ThrowsNotFoundException_WhenResponseCountIsZero()
        {
            // Arrange
            var request = new SearchPhotosByQuery("test", 1);

            _flickrApiServiceMock.Setup(
                x => x.GetPhotosAsync(request.Query, request.Page)
                ).ReturnsAsync(new FlickrResponseDto());

            var handler = new SearchPhotosByQueryHandler(
                _flickrApiServiceMock.Object,
                _photoServiceMock.Object,
                _cacheServiceMock.Object);

            // Act and Assert
            await Assert.ThrowsAsync<NotFoundException>(() => handler.Handle(request, CancellationToken.None));
        }

        [Fact]
        public async Task Handle_ReturnSearchPhotoResponse_WhenSearchPhotosResponseIsCreated()
        {
            // Arrange
            var request = new SearchPhotosByQuery("test", 1);

            var flickrResponse = new FlickrResponseDto { Photos = new FlickrPhotosDto { Page = 1, Pages = 1, PerPage = 1, Total = 10 } };

            _flickrApiServiceMock.Setup(
              x => x.GetPhotosAsync(request.Query, request.Page))
              .ReturnsAsync(flickrResponse);

            var photos = new List<Photo> { new Photo { Title = "Test", StandardUrl = "mock" } };

            _photoServiceMock.Setup(
                    x => x.CreatePhotos(
                        It.IsAny<List<FlickrPhotoDto>>()))
                    .Returns(photos);

            var handler = new SearchPhotosByQueryHandler(
                _flickrApiServiceMock.Object,
                _photoServiceMock.Object,
                _cacheServiceMock.Object);

            var expectedResponse = new SearchPhotosResponse(1, 1, 1, 10, new List<Photo> { new Photo { Title = "Test", StandardUrl = "mock" } });

            // Act 
            var result = await handler.Handle(request, CancellationToken.None);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(expectedResponse.Page, result.Page);
            Assert.Equal(expectedResponse.Pages, result.Pages);
            Assert.Equal(expectedResponse.PerPage, result.PerPage);
            Assert.Equal(expectedResponse.Total, result.Total);
            Assert.Equal(expectedResponse.Photos.First().Title, result.Photos.First().Title);
            Assert.Equal(expectedResponse.Photos.First().LargeSizeUrl, result.Photos.First().LargeSizeUrl);
            Assert.Equal(expectedResponse.Photos.First().MediumSizeUrl, result.Photos.First().MediumSizeUrl);
        }

        [Fact]
        public async Task Handler_ReturnSearchPhotoResponse_WhenSearchPhotosResponseIsCached()
        {
            // Arrange
            var request = new SearchPhotosByQuery("test", 1);
            var key = string.Concat(request.Query, request.Page);

            var photos = new List<Photo> { new Photo { Title = "Test", StandardUrl = "mock" } };

            var response = new SearchPhotosResponse(1, 1, 10, 10, new List<Photo>());

            _cacheServiceMock.Setup(
                    x => x.GetAsync<SearchPhotosResponse>(key, CancellationToken.None))
                    .ReturnsAsync(response);

            var handler = new SearchPhotosByQueryHandler(
                _flickrApiServiceMock.Object,
                _photoServiceMock.Object,
                _cacheServiceMock.Object);

            // Act 
            var result = await handler.Handle(request, default);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(response, result);
        }
    }
}
