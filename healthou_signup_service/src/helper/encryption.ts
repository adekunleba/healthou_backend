import { randomBytes, pbkdf2 } from "crypto";

const HASH_ITERATIONS : number = 11024;

export function createHash(input: string, salt: string|null) : Promise<{salt: string, hash: string}> {
    
    let insalt : string = salt != null ? salt : randomBytes(input.length).toString('base64');
    return new Promise((resolve :any, reject:any) => {
        return pbkdf2(input, insalt, HASH_ITERATIONS, 512, 'sha512', (err: any, hash: Buffer) =>
        {
            if (err) {
                return reject(err);
            }
            return resolve({
                salt: insalt,
                hash: hash.toString('base64')
            });
        });
    });
}