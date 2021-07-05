require("dotenv").config();

export const isProduction = process.env.NODE_ENV === "production";
if (!process.env.JWKS_URI) throw new Error('jwks uri Not Set');
if (!process.env.OPENID_ISSUER) throw new Error('open id issuer Not Set');


const config = {
    jwksUri : process.env.JWKS_URI,
    openID_Issuer : process.env.OPENID_ISSUER
}

export default config