function validateInput(type, value) {
    const errors = {};

    switch (type) {
        case 'name':
            const namePattern = /^[A-Za-z\s]{2,50}$/;
            if (!namePattern.test(value)) {
                errors.name = "Name must be 2-50 characters long and contain only alphabetic characters.";
            }
            break;

        case 'email':
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                errors.email = "Please enter a valid email address.";
            }
            break;

        case 'password':
            // Password pattern: at least one uppercase letter, one lowercase letter, one digit, one special character, and minimum 8 characters
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordPattern.test(value)) {
                errors.password = "Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.";
            }
            break;

        case 'address':
            // Address validation (dummy for now)
            if (!value) {
                errors.address = "Address is required.";
            }
            break;

        default:
            throw new Error("Invalid input type. Valid types are 'name', 'email', or 'password'.");
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
module.exports = validateInput


// Name Validation: { isValid: true, errors: {} }
// Email Validation: { isValid: true, errors: {} }
// Password Validation: { isValid: true, errors: {} }