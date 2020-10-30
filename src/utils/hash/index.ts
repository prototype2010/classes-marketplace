import * as bcrypt from 'bcrypt';

export const hashString = async (strongToHash: string, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);

  return bcrypt.hash(strongToHash, salt);
};
