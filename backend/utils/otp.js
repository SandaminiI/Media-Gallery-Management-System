export function generateOtp6() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function otpExpiryMinutes(min = 10) {
  return new Date(Date.now() + min * 60 * 1000);
}
