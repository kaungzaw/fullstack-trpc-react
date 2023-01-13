import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET ?? "JWT_SECRET";
const expiresIn = Number(process.env.JWT_EXPIRES_IN) ?? 60 * 60 * 1000;

export const createToken = (payload: any) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};

export const getTokenPayload = (token: string) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch {
    return null;
  }
};
