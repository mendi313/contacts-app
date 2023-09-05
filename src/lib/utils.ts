export function isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

 export function isValidPhoneNumber(phoneNumber: string): boolean {
    // Use a regular expression to validate the phone number format
    const phonePattern = /^\d{10}$/; // Assumes a 10-digit format, adjust as needed
    return phonePattern.test(phoneNumber);
  }