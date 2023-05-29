import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const getHash = async (password: string) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

export const compareHash = async (password: string, hash: string) => {
  const isEqual = await bcrypt.compare(password, hash);
  return isEqual;
};
