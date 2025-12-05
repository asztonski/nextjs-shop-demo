// Validation regex patterns

// Username must be 3-20 characters long, start with uppercase letter, rest lowercase letters or numbers
const usernameRegex = /^[A-Z][a-z0-9]{2,19}$/;
// Simple email regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Minimum eight characters, at least one letter and one number
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const validateNonEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateUsername = (username: string): boolean => {
  return validateNonEmpty(username) && usernameRegex.test(username);
};

export const validateEmail = (email: string): boolean => {
  return validateNonEmpty(email) && emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return validateNonEmpty(password) && passwordRegex.test(password);
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): boolean => {
  return (
    validateNonEmpty(password) &&
    validateNonEmpty(confirmPassword) &&
    password === confirmPassword
  );
};

// Universal validation handler with proper typing
export const createValidationHandler = <T extends unknown[]>(
  validationFunction: (...args: T) => boolean,
  setIsValid: (isValid: boolean) => void,
  timeout: number = 200
) => {
  return (...args: T): boolean => {
    if (!validationFunction(...args)) {
      setIsValid(false);
      // Optional: reset validity after some time
      // setTimeout(() => {
      //   setIsValid(true);
      // }, 4000);
      return false;
    } else {
      setTimeout(() => {
        setIsValid(true);
      }, timeout);
      return true;
    }
  };
};
