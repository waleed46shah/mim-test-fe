export const validateSignup = (
  username: string,
  email: string,
  password: string
) => {
  const errors: { username?: string; email?: string; password?: string } = {};

  if (!username) {
    errors.username = "Username is required.";
  }
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid.";
  }
  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
};

export const validateLogin = (email: string, password: string) => {
  const errors: { email?: string; password?: string } = {};

  if (!email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "Email is invalid.";
  }
  if (!password) {
    errors.password = "Password is required.";
  }

  return errors;
};
