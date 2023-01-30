using FinanceTracker.Data.Entities;

namespace FinanceTracker.Data.Repositories.Interfaces;

public interface ITransactionsRepository
{
    public Task<IList<Transaction>> GetTransactionsByUser(int UserId);
    public Task<IList<Transaction>> GetTransactionByCategory(int UserId, int CategoryId);

    public Task<IList<Transaction>> DeleteTransaction(int UserId, string CategoryName, decimal Amount, DateTime Date,
        string name);

    public Task<IList<Transaction>> AddTransaction(int UserId, string CategoryName, DateTime Date, decimal Amount,
        bool IsPeriodic, string PeriodType, string Name);

    public Task<IList<Transaction>> UpdateTransaction(int UserId, string OldName, string NewName, string OldCategory,
        string NewCategory, decimal OldAmount, decimal NewAmount, DateTime OldDate, DateTime NewDate, bool IsPeriodic,
        string PeriodType);
    
    public Task<IList<Transaction>> ModifyScheduledTransactions(int UserId, string CategoryName, decimal Amount, string name);

}