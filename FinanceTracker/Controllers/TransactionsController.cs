using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinanceTracker.Services.Models;
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

        public TransactionsController(ITransactionsService transactionsService)
        {
            _transactionsService = transactionsService;
        }

        [HttpPost]
        public async Task<ICollection<TransactionsDto>> GetTransactions([FromBody] UsernameDto request)
        {
            var temp = await _transactionsService.GetTransactionsByUser(request.Username);
            return temp;
        }

        [HttpPut]
        public async Task<ICollection<TransactionsDto>> UpdateTransaction([FromBody] TransactionToUpdateDto data)
        {
            return await _transactionsService.UpdateTransaction(data);
        }

        [HttpPost("delete")]
        public async Task<ICollection<TransactionsDto>> DeleteTransaction([FromBody] TransactionToDeleteDto data)
        {
            var temp = await _transactionsService.DeleteTransaction(data);
            return temp;
        }

        [HttpPost("create")]
        public async Task<ICollection<TransactionsDto>> AddTransaction([FromBody] TransactionToAddDto data)
        {
            return await _transactionsService.AddTransaction(data);
        }

        [HttpPost("deleteScheduled")]
        public async Task<ICollection<TransactionsDto>> ModifyScheduledTransactions([FromBody] TransactionToDeleteDto data)
        {
            return await _transactionsService.ModifyScheduledTransactions(data);
        }
    }
}