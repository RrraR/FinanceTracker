namespace FinanceTracker.Models;

public class TransactionToDeleteDto
{ 
    public string Username { get; set; }
    public string CategoryName { get; set; }
    public int Amount { get; set; }
    public DateTime Date { get; set; }
    public string Name { get; set; }
}