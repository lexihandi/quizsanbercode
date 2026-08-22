export const loginData = {
  valid: {
    username: "Admin",
    password: "admin123",
  },

  invalidUsername: {
    username: "invalidUser",
    password: "admin123",
  },

  invalidPassword: {
    username: "Admin",
    password: "wrong123",
  },

  emptyUsername: {
    username: "",
    password: "admin123",
  },

  emptyPassword: {
    username: "Admin",
    password: "",
  },

  specialCharacterPassword: {
    username: "Admin",
    password: "admin@123!",
  },

  lowercaseUsername: {
    username: "admin",
    password: "admin123",
  },

  usernameWithSpaces: {
    username: " Admin ",
    password: "admin123",
  },
};
