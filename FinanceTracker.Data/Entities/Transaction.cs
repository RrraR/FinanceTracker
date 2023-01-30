using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data.Entities
{
    public partial class Transaction
    {
        [Key]
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; } = 0;
        [StringLength(100)]
        public DateTime Date { get; set; }
        public int UserId { get; set; }
        public bool IsPeriodic { get; set; } = false;
        
        [StringLength(50)] 
        public string PeriodType { get; set; } = "one-time";
        [StringLength(50)]
        public string Name { get; set; }

        [ForeignKey("CategoryId")]
        [InverseProperty("Transactions")]
        public virtual Category Category { get; set; } = null!;
        [ForeignKey("UserId")]
        [InverseProperty("Transactions")]
        public virtual User User { get; set; } = null!;
    }
}
