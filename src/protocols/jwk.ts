const jwksClient = require('jwks-rsa');

export class generateKey{
    static async getjwks():Promise<string>{
        const jwkclient = jwksClient({
            jwksUri: 'https://sso.blukard.com/.well-known/openid-configuration/jwks',
            requestHeaders: {}, // Optional
            timeout: 30000 // Defaults to 30s
        });
      
        const kid = '6F560894C0F594ECD7F0C22B3F198A0E';
        const key = jwkclient.getSigningKey(kid)
        const signingKey = key.getPublicKey();
        console.log(signingKey)
        return signingKey
    }
}