﻿// <auto-generated />
using BanqueSI.Model;
using BanqueSI.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Microsoft.EntityFrameworkCore.ValueGeneration;
using System;

namespace BanqueSI.Migrations
{
    [DbContext(typeof(STBDbContext))]
    [Migration("20180327145715_STBDBV3")]
    partial class STBDBV3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BanqueSI.Model.Entities.Agence", b =>
                {
                    b.Property<int>("CodeAgence")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdresseAgence");

                    b.Property<double>("FondLiquideQuotidien");

                    b.Property<DateTime?>("HeureFermeture");

                    b.Property<DateTime?>("HeureOuverture");

                    b.Property<string>("NomAgence");

                    b.HasKey("CodeAgence");

                    b.ToTable("Agence");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Change", b =>
                {
                    b.Property<int>("IdChange")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AdresseP");

                    b.Property<int>("ChangeType");

                    b.Property<DateTime>("DateChange");

                    b.Property<string>("Destination");

                    b.Property<double>("ExchangeRate");

                    b.Property<string>("FromCurrencyCode");

                    b.Property<string>("FromCurrencyName");

                    b.Property<string>("Identif");

                    b.Property<double>("Montant");

                    b.Property<double>("MontantConverted");

                    b.Property<string>("NomP");

                    b.Property<string>("PrenomP");

                    b.Property<string>("ToCurrencyCode");

                    b.Property<string>("ToCurrencyName");

                    b.Property<int?>("employeCodePersonne");

                    b.HasKey("IdChange");

                    b.HasIndex("employeCodePersonne");

                    b.ToTable("Change");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Cheque", b =>
                {
                    b.Property<int>("idC")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BankName");

                    b.Property<int>("CINProprietaire");

                    b.Property<int?>("ClientCodePersonne");

                    b.Property<string>("CompteCodeCompte");

                    b.Property<DateTime>("DateV");

                    b.Property<int?>("EmployeCodePersonne");

                    b.Property<double>("Montant");

                    b.Property<string>("NomProprietaire");

                    b.Property<double>("NumeroC");

                    b.Property<string>("PrenomProprietaire");

                    b.HasKey("idC");

                    b.HasIndex("ClientCodePersonne");

                    b.HasIndex("CompteCodeCompte");

                    b.HasIndex("EmployeCodePersonne");

                    b.ToTable("Cheque");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Compte", b =>
                {
                    b.Property<string>("CodeCompte")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreation");

                    b.Property<double?>("Decouvert");

                    b.Property<int?>("PersonneCodePersonne");

                    b.Property<double>("Solde");

                    b.Property<double?>("Taux");

                    b.Property<int>("Type");

                    b.Property<int?>("clientCodePersonne");

                    b.HasKey("CodeCompte");

                    b.HasIndex("PersonneCodePersonne");

                    b.HasIndex("clientCodePersonne");

                    b.ToTable("Compte");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Mail", b =>
                {
                    b.Property<string>("IdEmail")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CCEmail");

                    b.Property<DateTime>("DateEmail");

                    b.Property<bool>("Deleted");

                    b.Property<string>("From");

                    b.Property<string>("MessageEmail");

                    b.Property<string>("ObjectEmail");

                    b.Property<int?>("PersonneCodePersonne");

                    b.Property<bool>("Sent");

                    b.Property<string>("To");

                    b.HasKey("IdEmail");

                    b.HasIndex("PersonneCodePersonne");

                    b.ToTable("Mail");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Operation", b =>
                {
                    b.Property<int>("NumeroOperation")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CompteCodeCompte");

                    b.Property<DateTime>("DateOperation");

                    b.Property<int?>("EmployeCodePersonne");

                    b.Property<double>("Montant");

                    b.Property<int>("TypeO");

                    b.HasKey("NumeroOperation");

                    b.HasIndex("CompteCodeCompte");

                    b.HasIndex("EmployeCodePersonne");

                    b.ToTable("Operation");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Personne", b =>
                {
                    b.Property<int>("CodePersonne")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AgenceCodeAgence");

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Email");

                    b.Property<string>("NomPersonne");

                    b.HasKey("CodePersonne");

                    b.HasIndex("AgenceCodeAgence");

                    b.ToTable("Personne");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Personne");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Client", b =>
                {
                    b.HasBaseType("BanqueSI.Model.Entities.Personne");


                    b.ToTable("Client");

                    b.HasDiscriminator().HasValue("Client");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Employe", b =>
                {
                    b.HasBaseType("BanqueSI.Model.Entities.Personne");

                    b.Property<int?>("EmployeSupCodePersonne");

                    b.Property<string>("Password");

                    b.Property<string>("Username");

                    b.HasIndex("EmployeSupCodePersonne");

                    b.ToTable("Employe");

                    b.HasDiscriminator().HasValue("Employe");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Change", b =>
                {
                    b.HasOne("BanqueSI.Model.Entities.Employe", "employe")
                        .WithMany("Changes")
                        .HasForeignKey("employeCodePersonne");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Cheque", b =>
                {
                    b.HasOne("BanqueSI.Model.Entities.Client", "Client")
                        .WithMany("Cheques")
                        .HasForeignKey("ClientCodePersonne");

                    b.HasOne("BanqueSI.Model.Entities.Compte", "Compte")
                        .WithMany("Cheques")
                        .HasForeignKey("CompteCodeCompte");

                    b.HasOne("BanqueSI.Model.Entities.Employe", "Employe")
                        .WithMany("Cheques")
                        .HasForeignKey("EmployeCodePersonne");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Compte", b =>
                {
                    b.HasOne("BanqueSI.Model.Entities.Employe", "Personne")
                        .WithMany("Comptes")
                        .HasForeignKey("PersonneCodePersonne");

                    b.HasOne("BanqueSI.Model.Entities.Client", "client")
                        .WithMany("Comptes")
                        .HasForeignKey("clientCodePersonne");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Mail", b =>
                {
                    b.HasOne("BanqueSI.Model.Entities.Personne", "Personne")
                        .WithMany("Mail")
                        .HasForeignKey("PersonneCodePersonne");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Operation", b =>
                {
                    b.HasOne("BanqueSI.Model.Entities.Compte", "Compte")
                        .WithMany("Operations")
                        .HasForeignKey("CompteCodeCompte");

                    b.HasOne("BanqueSI.Model.Entities.Employe", "Employe")
                        .WithMany("Operations")
                        .HasForeignKey("EmployeCodePersonne");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Personne", b =>
                {
                    b.HasOne("BanqueSI.Model.Entities.Agence", "Agence")
                        .WithMany("Personnes")
                        .HasForeignKey("AgenceCodeAgence");
                });

            modelBuilder.Entity("BanqueSI.Model.Entities.Employe", b =>
                {
                    b.HasOne("BanqueSI.Model.Entities.Employe", "EmployeSup")
                        .WithMany()
                        .HasForeignKey("EmployeSupCodePersonne");
                });
#pragma warning restore 612, 618
        }
    }
}
