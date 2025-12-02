export const credentials = {
  username: 'admin',
  password: 'password123',
  tokenexpirysecs: 1,
  tokenexpirysecs1: Number(process.env.EXPIRY_TIME) || 5,
};

export const user2 = {
  username: 'admin',
  password: 'password123',
  tokenexpirysecs: 30,
  tokenexpirysecs1: Number(process.env.EXPIRY_TIME) || 5,
};
