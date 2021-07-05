import { Req, Res } from "@tsed/common";
import { Middleware } from "@tsed/common"
import { users } from "src/entity/users";
const jwt = require('jsonwebtoken');

@Middleware()
export class authentication {
    public async use(@Req() req: Req, @Res() res:Res):Promise<Res>{
        const options = {
            issuer : "https://sso.blukard.com"
        }
        const jwksClient = require('jwks-rsa');
      
        const jwkclient = jwksClient({
            jwksUri: 'https://sso.blukard.com/.well-known/openid-configuration/jwks',
            requestHeaders: {}, // Optional
            timeout: 30000 // Defaults to 30s
        });
          
        const kid = '6F560894C0F594ECD7F0C22B3F198A0E';
        const key = await jwkclient.getSigningKey(kid);
        const signingKey = key.getPublicKey();

        const AuthHeader = req.headers['authorization']
        const Token = AuthHeader && AuthHeader.split(' ')[1]

        if(Token == null) return res.status(401).json({error:'Unauthorized request'})

        return jwt.verify(Token, signingKey , options, (err: never, data: users | undefined) => {
            if(err) return res.status(401).json({error:'invalid token or token expired'})
            
            res.send(data)
        })
        
    }
}