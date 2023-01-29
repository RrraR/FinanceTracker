using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace FinanceTracker.Data.Entities
{
    public partial class User
    {
        public User()
        {
            Transactions = new HashSet<Transaction>();
            Categories = new HashSet<Category>();
        }

        [Key]
        public int Id { get; set; }
        [StringLength(30)]
        public string Username { get; set; } = null!;
        [StringLength(30)]
        public string Password { get; set; } = null!;

        [InverseProperty("User")]
        public virtual ICollection<Transaction> Transactions { get; set; }
        
        [InverseProperty("User")]
        public virtual ICollection<Category> Categories { get; set; }
    }
}
