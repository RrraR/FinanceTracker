using FinanceTracker.Services.Objects;

namespace FinanceTracker.Services.Services.Interfaces;

public interface ITransactionsService
{
    public Task<ICollection<TransactionsObject>> GetTransactionsByUser(string Username);
    public Task<ICollection<TransactionsObject>> AddTransaction(TransactionToAddObject data);
    public Task<ICollection<TransactionsObject>> UpdateTransaction(TransactionToUpdateObject data);
    public Task<ICollection<TransactionsObject>> DeleteTransaction(TransactionToDeleteObject data);
    public Task<ICollection<TransactionsObject>> ModifyScheduledTransactions(TransactionToDeleteObject data);

}