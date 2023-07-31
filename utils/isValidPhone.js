export function isValidContactNumber(contactNumber) {
  const contactPattern = /^\+?[\d\s-]+$/;
  const cleanedContact = contactNumber.replace(/\D/g, "");

  return contactPattern.test(cleanedContact);
}

