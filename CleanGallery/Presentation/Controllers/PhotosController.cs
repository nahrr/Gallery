using Application.Photos.Queries;
using Domain.Shared;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace Presentation.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    [Produces("application/json")]
    public class PhotosController : ApiController
    {
        public PhotosController(ISender sender) 
            : base(sender) 
        { 
        }

        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(SearchPhotosResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(Error))]
        [ProducesResponseType(StatusCodes.Status404NotFound, Type = typeof(Error))]
        [ProducesResponseType(StatusCodes.Status500InternalServerError, Type = typeof(Error))]
        [HttpGet]
        public async Task<IActionResult> Search(
            [Required] string query,
            [Required] int page,
            CancellationToken cancellationToken)
        {
            var searchQuery = new SearchPhotosByQuery(query, page);

            SearchPhotosResponse response = await _sender.Send(searchQuery, cancellationToken);

            return Ok(response);
        }
    }
}