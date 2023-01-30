using FinanceTracker.Data.Entities;
using FinanceTracker.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data.Repositories;

public class TransactionsRepository : ITransactionsRepository
{
    private readonly FinanceTrackerDbContext _dbContext;

    public TransactionsRepository(FinanceTrackerDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IList<Transaction>> GetTransactionsByUser(int UserId)
    {
        var temp = await _dbContext.Transactions.Where(t => t.UserId == UserId).ToListAsync();
        var res = temp.OrderByDescending(t => t.Date).ToList();
        return res;
    }

    // public async Task<IList<Transaction>> DeleteTransaction(int UserId, int CategoryId)
    // {
    //     var temp = await _dbContext.Transactions.Where(t =>
    //         t.UserId == UserId && t.CategoryId == CategoryId).ToListAsync();
    //     // foreach (var item in temp)
    //     // {
    //     //     
    //     // }
    //     _dbContext.Remove(temp);
    //     await _dbContext.SaveChangesAsync();
    //     return await GetTransactionsByUser(UserId);
    // }

    public async Task<IList<Transaction>> GetTransactionByCategory(int UserId, int CategoryId)
    {
        var temp = await _dbContext.Transactions.Where(t =>
            t.UserId == UserId && t.CategoryId == CategoryId).ToListAsync();
        return temp;
    }

    public async Task<IList<Transaction>> DeleteTransaction(int UserId, string CategoryName, decimal Amount, DateTime Date,
        string Name)
    {
        var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Title == CategoryName);
        var transactions = await _dbContext.Transactions.Where(t =>
            t.UserId == UserId && t.CategoryId == category.Id && t.Date == Date && t.Amount == Amount &&
            t.Name == Name).ToListAsync();
        foreach (var item in transactions)
        {
            _dbContext.Transactions.Remove(item);
        }

        await _dbContext.SaveChangesAsync();
        return await GetTransactionsByUser(UserId);
    }

    public async Task<IList<Transaction>> AddTransaction(int UserId, string CategoryName, DateTime Date, decimal Amount,
        bool IsPeriodic, string PeriodType, string Name)
    {
        var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Title == CategoryName);
        var transact = new Transaction
        {
            CategoryId = category.Id,
            Amount = Amount < 0 ? 0 : Amount,
            UserId = UserId,
            Date = Date,
            Name = string.IsNullOrEmpty(Name) ? CategoryName : Name,
            IsPeriodic = IsPeriodic,
            PeriodType = string.IsNullOrEmpty(PeriodType) ? "one-time" : PeriodType
        };

        await _dbContext.Transactions.AddAsync(transact);
        await _dbContext.SaveChangesAsync();
        return await GetTransactionsByUser(UserId);
    }

    public async Task<IList<Transaction>> UpdateTransaction(int UserId, string OldName, string NewName,
        string OldCategory, string NewCategory, decimal OldAmount, decimal NewAmount, DateTime OldDate, DateTime NewDate,
        bool IsPeriodic, string PeriodType)
    {
        var OCategory = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Title == OldCategory);
        var NCategory = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Title == NewCategory);

        var transactions = new List<Transaction>();

        if (IsPeriodic)
        {
            transactions = await _dbContext.Transactions.Where(t =>
                t.CategoryId == OCategory.Id && t.Amount == OldAmount && t.Name == OldName &&
                t.IsPeriodic == IsPeriodic).ToListAsync();
        }
        else
        {
            transactions = await _dbContext.Transactions.Where(t =>
                t.CategoryId == OCategory.Id && t.Amount == OldAmount && t.Date == OldDate && t.Name == OldName &&
                t.IsPeriodic == IsPeriodic).ToListAsync();
        }
        
        foreach (var item in transactions)
        {
            item.Name = NewName;
            item.Amount = NewAmount == 0 ? 0 : NewAmount;
            item.CategoryId = NCategory.Id;
            item.Date = NewDate;
            item.IsPeriodic = IsPeriodic;
            if (!string.IsNullOrEmpty(PeriodType))
            {
                item.PeriodType = PeriodType;
            }
        }

        await _dbContext.SaveChangesAsync();
        return await GetTransactionsByUser(UserId);
    }

    public async Task<IList<Transaction>> ModifyScheduledTransactions(int UserId, string CategoryName, decimal Amount, string name)
    {
        var category = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Title == CategoryName);
        
        var transactions = await _dbContext.Transactions.Where(t =>
            t.UserId == UserId && t.CategoryId == category.Id && t.Amount == Amount &&
            t.Name == name).ToListAsync();
        foreach (var item in transactions)
        {
            item.IsPeriodic = false;
            item.PeriodType = "one-time";
        }

        await _dbContext.SaveChangesAsync();
        return await GetTransactionsByUser(UserId);
    }
}