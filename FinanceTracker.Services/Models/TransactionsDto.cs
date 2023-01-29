using System.Text.Json;
using System.Text.Json.Serialization;

namespace FinanceTracker.Services.Models;

public class TransactionsDto
{
    public int Id { get; set; }
    public string CategoryName { get; set; }
    public string CategoryType { get; set; }
    public int Amount { get; set; }
    public DateOnly Date { get; set; }
    public bool IsPeriodic { get; set; }
    public string? PeriodType { get; set; }
    public string Name { get; set; }
}

public class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateOnly.Parse(reader.GetString()!);
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        var isoDate = value.ToString("O");
        writer.WriteStringValue(isoDate);
    }
}