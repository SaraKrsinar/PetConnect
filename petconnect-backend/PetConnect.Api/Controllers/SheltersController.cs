using Microsoft.AspNetCore.Mvc;
using PetConnect.Application.DTOs;
using PetConnect.Application.Services;

namespace PetConnect.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SheltersController : ControllerBase
{
    private readonly IShelterService _shelterService;

    public SheltersController(IShelterService shelterService)
    {
        _shelterService = shelterService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShelterDto>>> GetAll()
    {
        var shelters = await _shelterService.GetAllAsync();
        return Ok(shelters);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ShelterDto>> GetById(int id)
    {
        var shelter = await _shelterService.GetByIdAsync(id);
        if (shelter == null)
            return NotFound();

        return Ok(shelter);
    }


    [HttpPost]
    public async Task<ActionResult<ShelterDto>> Create([FromBody] CreateShelterDto dto)
    {
        var created = await _shelterService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<ShelterDto>> Update(int id, [FromBody] UpdateShelterDto dto)
    {
        var updated = await _shelterService.UpdateAsync(id, dto);
        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _shelterService.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
