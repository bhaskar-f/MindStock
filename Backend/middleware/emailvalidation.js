export async function validateAndSend(userEmail) {
  // Check email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(userEmail)) {
    console.error("Email format is invalid.");
    return false;
  }

  console.log("Email format is valid. Proceeding to send verification...");
  return true;
}
