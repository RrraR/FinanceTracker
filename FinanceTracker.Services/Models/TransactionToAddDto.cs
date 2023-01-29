namespace FinanceTracker.Services.Models;

public class TransactionToAddDto
{
    public string Username { get; set; }
    public string CategoryName { get; set; }
    public int Amount { get; set; }
    public DateTime Date { get; set; }
    public bool IsPeriodic { get; set; }
    public string? PeriodType { get; set; }
    public string Name { get; set; }
}