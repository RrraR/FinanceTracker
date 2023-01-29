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
        public async Task<ICollection<TransactionsObject>> GetTransactions([FromBody] UsernameDto request)
        {
            var temp = await _transactionsService.GetTransactionsByUser(request.Username);
            return temp;
        }

        [HttpPut]
        public async Task<ICollection<TransactionsObject>> UpdateTransaction([FromBody] TransactionToUpdateDto data)
        {
            return await _transactionsService.UpdateTransaction(_autoMapper.Map<TransactionToUpdateObject>(data));
        }

        [HttpPost("delete")]
        public async Task<ICollection<TransactionsObject>> DeleteTransaction([FromBody] TransactionToDeleteDto data)
        {
            var temp = await _transactionsService.DeleteTransaction(_autoMapper.Map<TransactionToDeleteObject>(data));
            return temp;
        }

        [HttpPost("create")]
        public async Task<ICollection<TransactionsObject>> AddTransaction([FromBody] TransactionToAddDto data)
        {
            return await _transactionsService.AddTransaction(_autoMapper.Map<TransactionToAddObject>(data));
        }

        [HttpPost("deleteScheduled")]
        public async Task<ICollection<TransactionsObject>> ModifyScheduledTransactions([FromBody] TransactionToDeleteDto data)
        {
            return await _transactionsService.ModifyScheduledTransactions(_autoMapper.Map<TransactionToDeleteObject>(data));
        }
    }
}