namespace FinanceTracker.Services.Objects;

public class TransactionToUpdateObject
{
    public string Username { get; set; }
    public string OldName { get; set; }
    public string NewName { get; set; }
    public string OldCategory { get; set; }
    public string NewCategory { get; set; }
    public decimal OldAmount { get; set; }
    public decimal NewAmount { get; set; }
    public DateTime OldDate { get; set; }
    public DateTime NewDate { get; set; }
    public bool IsPeriodic { get; set; }
    public string? PeriodType { get; set; }
    
}