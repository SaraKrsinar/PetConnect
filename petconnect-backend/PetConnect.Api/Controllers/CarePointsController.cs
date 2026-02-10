using Microsoft.AspNetCore.Mvc;
using PetConnect.Application.DTOs;
using PetConnect.Application.Services;

namespace PetConnect.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CarePointsController : ControllerBase
{
    private readonly ICarePointService _carePointService;

    public CarePointsController(ICarePointService carePointService)
    {
        _carePointService = carePointService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CarePointDto>>> GetAll()
    {
        var carePoints = await _carePointService.GetAllAsync();
        return Ok(carePoints);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CarePointWithUpdatesDto>> GetById(int id)
    {
        var carePoint = await _carePointService.GetByIdAsync(id);
        if (carePoint == null)
            return NotFound();

        return Ok(carePoint);
    }

    [HttpPost]
    public async Task<ActionResult<CarePointDto>> Create([FromBody] CreateCarePointDto dto)
    {
        var created = await _carePointService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CarePointDto>> Update(int id, [FromBody] UpdateCarePointDto dto)
    {
        var updated = await _carePointService.UpdateAsync(id, dto);
        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _carePointService.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }

    [HttpPost("{id}/updates")]
    public async Task<ActionResult<CarePointUpdateDto>> AddUpdate(int id, [FromBody] CreateCarePointUpdateDto dto)
    {
        var update = await _carePointService.AddUpdateAsync(id, dto);
        if (update == null)
            return NotFound();

        return Ok(update);
    }
}
