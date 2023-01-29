using FinanceTracker.Services.Models;

namespace FinanceTracker.Services.Services.Interfaces;

public interface ITransactionsService
{
    public Task<ICollection<TransactionsDto>> GetTransactionsByUser(string Username);
    public Task<ICollection<TransactionsDto>> AddTransaction(TransactionToAddDto data);
    public Task<ICollection<TransactionsDto>> UpdateTransaction(TransactionToUpdateDto data);
    public Task<ICollection<TransactionsDto>> DeleteTransaction(TransactionToDeleteDto data);
    public Task<ICollection<TransactionsDto>> ModifyScheduledTransactions(TransactionToDeleteDto data);

}