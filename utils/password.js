import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 8);
  return hash;
};

export const handlePassword = (password, hashedPassword) => {
  const verify = bcrypt.compareSync(password, hashedPassword);
  return verify;
};
