﻿using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MomoMecha.Models;

namespace MomoMecha.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Gundam> Gundams { get; set; }
        public DbSet<Backlog> Backlogs { get; set; }
        public DbSet<WishList> WishList { get; set; }
        public DbSet<Sale> Sales { get; set; }
    }
}