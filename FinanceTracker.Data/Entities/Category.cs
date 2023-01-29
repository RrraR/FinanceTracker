using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data.Entities
{
    public partial class Category
    {
        public Category()
        {
            Transactions = new HashSet<Transaction>();

        }

        [Key]
        public int Id { get; set; }
        [StringLength(50)]
        public string Title { get; set; } = null!;
        [StringLength(50)]
        public string Type { get; set; } = null!;
        public int UserId { get; set; }

        [InverseProperty("Category")]
        public virtual ICollection<Transaction> Transactions { get; set; }
        
        [ForeignKey("UserId")]
        [InverseProperty("Categories")]
        public virtual User User { get; set; } = null!;
    }
}
