using AutoMapper;
using FinanceTracker.Data.Entities;
using FinanceTracker.Data.Repositories.Interfaces;
using FinanceTracker.Services.Objects;
using FinanceTracker.Services.Services.Interfaces;

namespace FinanceTracker.Services.Services;

public class TransactionsService : ITransactionsService
{
    private readonly IMapper _autoMapper;
    private readonly IUserRepository _userRepository;
    private readonly ITransactionsRepository _transactionsRepository;


    public TransactionsService(IMapper autoMapper, ITransactionsRepository transactionsRepository,
        IUserRepository userRepository)
    {
        _autoMapper = autoMapper;
        _transactionsRepository = transactionsRepository;
        _userRepository = userRepository;
    }

    public async Task<ICollection<TransactionsObject>> GetTransactionsByUser(string Username)
    {
        var user = await _userRepository.GetUser(Username, string.Empty);
        var res = await _transactionsRepository.GetTransactionsByUser(user.Id);

        var temp = _autoMapper.Map<ICollection<TransactionsObject>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsObject>> AddTransaction(TransactionToAddObject data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _transactionsRepository.AddTransaction(user.Id, data.CategoryName, data.Date, data.Amount,
            data.IsPeriodic, data.PeriodType, data.Name);
        var temp = _autoMapper.Map<ICollection<TransactionsObject>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsObject>> UpdateTransaction(TransactionToUpdateObject data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        
        var res = await _transactionsRepository.UpdateTransaction(user.Id, data.OldName, data.NewName, data.OldCategory,
            data.NewCategory,
            data.OldAmount, data.NewAmount, data.OldDate, data.NewDate, data.IsPeriodic, data.PeriodType);
        var temp = _autoMapper.Map<ICollection<TransactionsObject>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsObject>> DeleteTransaction(TransactionToDeleteObject data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _transactionsRepository.DeleteTransaction(user.Id, data.CategoryName, data.Amount, data.Date, data.Name);
        var temp = _autoMapper.Map<ICollection<TransactionsObject>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsObject>> ModifyScheduledTransactions(TransactionToDeleteObject data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _transactionsRepository.ModifyScheduledTransactions(user.Id, data.CategoryName, data.Amount, data.Name);
        var temp = _autoMapper.Map<ICollection<TransactionsObject>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }
}