using System.Text;
using Microsoft.IdentityModel.Tokens;

/*
    File: Program.cs
    Author:
    Description: This file is used to initialize the program.
 */
internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        //Setup mongoDB service and other services
        builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDB"));
        builder.Services.AddScoped<ITrainScheduleService, TrainScheduleService>();
        builder.Services.AddScoped<IReservationService, ReservationService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IAuthService, AuthService>();

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddAuthentication().AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateAudience = false,
                ValidateIssuer = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("Open the appsettings.json and then inside SiteSettings Or AppSettings find the string that you name as SecretKey OR JwtSecret or what ever you prefer in model as the images"))
            };
        });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();
        app.MapGet("/", () => "Server is running");

        app.MapControllers();

        app.Run();
    }
}