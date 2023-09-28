using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

public class ComparePasswordsAttribute : ValidationAttribute
{
    private readonly string otherProperty;

    public ComparePasswordsAttribute(string otherProperty)
    {
        this.otherProperty = otherProperty;
    }

    protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    {
        var propertyInfo = validationContext.ObjectType.GetProperty(otherProperty);

        if (propertyInfo == null)
        {
            return new ValidationResult($"Property {otherProperty} not found.");
        }

        var otherValue = propertyInfo.GetValue(validationContext.ObjectInstance);

        if (!object.Equals(value, otherValue))
        {
            var errorMessage = ErrorMessage ?? "Password and Confirm Password must match";

            var response = new ServiceResponse<EmptyData>
            {
                Data = null,
                Message = errorMessage,
                Status = false
            };

            var jsonError = JsonConvert.SerializeObject(response);

            return new ValidationResult(jsonError);
        }

        return ValidationResult.Success;
    }
}