using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FinanceTracker.Services.Models;

public class AuthRequestDto
{
    [Required]
    [JsonPropertyName("username")]
    public string Username { get; set; }

    [Required]
    [JsonPropertyName("password")]
    public string? Password { get; set; }
}