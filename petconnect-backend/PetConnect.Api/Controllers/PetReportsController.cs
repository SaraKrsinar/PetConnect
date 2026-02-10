using Microsoft.AspNetCore.Mvc;
using PetConnect.Application.DTOs;
using PetConnect.Application.Services;

namespace PetConnect.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PetReportsController : ControllerBase
{
    private readonly IPetReportService _petReportService;

    public PetReportsController(IPetReportService petReportService)
    {
        _petReportService = petReportService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PetReportDto>>> GetAll()
    {
        var reports = await _petReportService.GetAllAsync();
        return Ok(reports);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PetReportDto>> GetById(int id)
    {
        var report = await _petReportService.GetByIdAsync(id);
        if (report == null)
            return NotFound();

        return Ok(report);
    }

    [HttpPost]
    public async Task<ActionResult<PetReportDto>> Create([FromBody] CreatePetReportDto dto)
    {
        var created = await _petReportService.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<PetReportDto>> Update(int id, [FromBody] UpdatePetReportDto dto)
    {
        var updated = await _petReportService.UpdateAsync(id, dto);
        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _petReportService.DeleteAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
