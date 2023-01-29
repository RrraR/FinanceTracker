namespace FinanceTracker.Models;

public class TransactionToUpdateDto
{
    public string Username { get; set; }
    public string OldName { get; set; }
    public string NewName { get; set; }
    public string OldCategory { get; set; }
    public string NewCategory { get; set; }
    public int OldAmount { get; set; }
    public int NewAmount { get; set; }
    public DateTime OldDate { get; set; }
    public DateTime NewDate { get; set; }
    public bool IsPeriodic { get; set; }
    public string? PeriodType { get; set; }
    
}