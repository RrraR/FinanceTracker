using AutoMapper;
using FinanceTracker.Data.Entities;
using FinanceTracker.Data.Repositories.Interfaces;
using FinanceTracker.Services.Models;
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

    public async Task<ICollection<TransactionsDto>> GetTransactionsByUser(string Username)
    {
        var user = await _userRepository.GetUser(Username, string.Empty);
        var res = await _transactionsRepository.GetTransactionsByUser(user.Id);

        var temp = _autoMapper.Map<ICollection<TransactionsDto>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsDto>> AddTransaction(TransactionToAddDto data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _transactionsRepository.AddTransaction(user.Id, data.CategoryName, data.Date, data.Amount,
            data.IsPeriodic, data.PeriodType, data.Name);
        var temp = _autoMapper.Map<ICollection<TransactionsDto>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsDto>> UpdateTransaction(TransactionToUpdateDto data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        
        var res = await _transactionsRepository.UpdateTransaction(user.Id, data.OldName, data.NewName, data.OldCategory,
            data.NewCategory,
            data.OldAmount, data.NewAmount, data.OldDate, data.NewDate, data.IsPeriodic, data.PeriodType);
        var temp = _autoMapper.Map<ICollection<TransactionsDto>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsDto>> DeleteTransaction(TransactionToDeleteDto data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _transactionsRepository.DeleteTransaction(user.Id, data.CategoryName, data.Amount, data.Date, data.Name);
        var temp = _autoMapper.Map<ICollection<TransactionsDto>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }

    public async Task<ICollection<TransactionsDto>> ModifyScheduledTransactions(TransactionToDeleteDto data)
    {
        var user = await _userRepository.GetUser(data.Username, string.Empty);
        var res = await _transactionsRepository.ModifyScheduledTransactions(user.Id, data.CategoryName, data.Amount, data.Name);
        var temp = _autoMapper.Map<ICollection<TransactionsDto>>(res);

        foreach (var item in temp)
        {
            var date = res.FirstOrDefault(t => t.Id == item.Id).Date;
            item.Date = DateOnly.FromDateTime(date);
        }

        return temp;
    }
}