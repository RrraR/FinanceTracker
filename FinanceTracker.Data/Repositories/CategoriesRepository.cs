using System.Runtime.CompilerServices;
using FinanceTracker.Data.Entities;
using FinanceTracker.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data.Repositories;

public class CategoriesRepository : ICategoriesRepository
{
    private readonly FinanceTrackerDbContext _dbContext;
    private readonly ITransactionsRepository _transactionsRepository;

    public CategoriesRepository(FinanceTrackerDbContext dbContext, ITransactionsRepository transactionsRepository)
    {
        _dbContext = dbContext;
        _transactionsRepository = transactionsRepository;
    }

    public async Task<ICollection<Category>> GetCategoriesByUser(int UserId)
    {
        return await _dbContext.Categories.Where(c => c.UserId == UserId).ToListAsync();
    }

    public async Task<ICollection<Category>> UpdateCategory(int UserId, string OldVaue, string NewValue)
    {
        var temp = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Title == OldVaue && c.UserId == UserId);
        temp.Title = NewValue;
        await _dbContext.SaveChangesAsync();
        return await GetCategoriesByUser(UserId);
    }

    public async Task<ICollection<Category>> DeleteCategory(int UserId, string categoryName)
    {
        var temp = await _dbContext.Categories.FirstOrDefaultAsync(c => c.Title == categoryName && c.UserId == UserId);
        var transact = await _transactionsRepository.GetTransactionByCategory(UserId, temp.Id);
        if (transact == null)
        {
            // temp.Transactions = new HashSet<Transaction>();
            _dbContext.Categories.Remove(temp);
            await _dbContext.SaveChangesAsync();

        }
        else
        {
            foreach (var item in transact)
            {
                _dbContext.Transactions.Remove(item);
            }
            _dbContext.Categories.Remove(temp);
            await _dbContext.SaveChangesAsync();

        }
        return await GetCategoriesByUser(UserId);
    }

    public async Task<ICollection<Category>> CreateCategory(int UserId, string categoryName, string categoryType)
    {
        var temp = new Category()
        {
            Title = categoryName,
            Type = categoryType,
            UserId = UserId
        };
        await _dbContext.Categories.AddAsync(temp);
        await _dbContext.SaveChangesAsync();
        return await GetCategoriesByUser(UserId);
    }
}