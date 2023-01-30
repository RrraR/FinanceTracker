using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FinanceTracker.Models;
using FinanceTracker.Services.Objects;
using FinanceTracker.Services.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinanceTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionsService _transactionsService;
        private readonly IMapper _autoMapper;


        public TransactionsController(ITransactionsService transactionsService, IMapper autoMapper)
        {
            _transactionsService = transactionsService;
            _autoMapper = autoMapper;
        }

        [HttpPost]
        public async Task<ICollection<TransactionsDto>> GetTransactions([FromBody] UsernameDto request)
        {
            var temp = await _transactionsService.GetTransactionsByUser(request.Username);
            return _autoMapper.Map<ICollection<TransactionsDto>>(temp);
        }

        [HttpPut]
        public async Task<ICollection<TransactionsDto>> UpdateTransaction([FromBody] TransactionToUpdateDto data)
        {
            var temp = await _transactionsService.UpdateTransaction(_autoMapper.Map<TransactionToUpdateObject>(data));
            return _autoMapper.Map<ICollection<TransactionsDto>>(temp);
        }

        [HttpPost("delete")]
        public async Task<ICollection<TransactionsDto>> DeleteTransaction([FromBody] TransactionToDeleteDto data)
        {
            var temp = await _transactionsService.DeleteTransaction(_autoMapper.Map<TransactionToDeleteObject>(data));
            return _autoMapper.Map<ICollection<TransactionsDto>>(temp);
        }

        [HttpPost("create")]
        public async Task<ICollection<TransactionsDto>> AddTransaction([FromBody] TransactionToAddDto data)
        {
            var temp = await _transactionsService.AddTransaction(_autoMapper.Map<TransactionToAddObject>(data));
            return _autoMapper.Map<ICollection<TransactionsDto>>(temp);
        }

        [HttpPost("deleteScheduled")]
        public async Task<ICollection<TransactionsDto>> ModifyScheduledTransactions(
            [FromBody] TransactionToDeleteDto data)
        {
            var temp = await _transactionsService.ModifyScheduledTransactions(
                _autoMapper.Map<TransactionToDeleteObject>(data));
            return _autoMapper.Map<ICollection<TransactionsDto>>(temp);
        }
    }
}