import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const getHash: (password: string) => Promise<string> = async (
  password
) => {
  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  return hash;
};

export const compareHash: (
  password: string,
  hash: string
) => Promise<boolean> = async (password, hash) => {
  const isEqual = await bcrypt.compare(password, hash);
  return isEqual;
};
