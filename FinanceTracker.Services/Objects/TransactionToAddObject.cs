namespace FinanceTracker.Services.Objects;

public class TransactionToAddObject
{
    public string Username { get; set; }
    public string CategoryName { get; set; }
    public decimal Amount { get; set; }
    public DateTime Date { get; set; }
    public bool IsPeriodic { get; set; }
    public string? PeriodType { get; set; }
    public string Name { get; set; }
}