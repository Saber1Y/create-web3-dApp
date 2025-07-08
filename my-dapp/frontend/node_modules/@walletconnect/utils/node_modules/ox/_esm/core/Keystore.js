import { ctr } from '@noble/ciphers/aes';
import { pbkdf2Async as pbkdf2Async_noble, pbkdf2 as pbkdf2_noble, } from '@noble/hashes/pbkdf2';
import { scryptAsync as scryptAsync_noble, scrypt as scrypt_noble, } from '@noble/hashes/scrypt';
import { sha256 } from '@noble/hashes/sha2';
import * as Bytes from './Bytes.js';
import * as Hash from './Hash.js';
/**
 * Decrypts a [JSON keystore](https://ethereum.org/en/developers/docs/data-structures-and-encoding/web3-secret-storage/)
 * into a private key.
 *
 * Supports the following key derivation functions (KDFs):
 * - {@link ox#Keystore.(pbkdf2:function)}
 * - {@link ox#Keystore.(scrypt:function)}
 *
 * @example
 * ```ts twoslash
 * // @noErrors
 * import { Keystore, Secp256k1 } from 'ox'
 *
 * // JSON keystore.
 * const keystore = { crypto: { ... }, id: '...', version: 3 }
 *
 * // Derive key from password.
 * const key = Keystore.pbkdf2({ password: 'testpassword' })
 *
 * // Decrypt the private key.
 * const privateKey = await Keystore.decrypt(keystore, key)
 * // @log: "0x..."
 * ```
 *
 * @param keystore - JSON keystore.
 * @param key - Key to use for decryption.
 * @param options - Decryption options.
 * @returns Decrypted private key.
 */
export async function decrypt(keystore, key, options = {}) {
    const { as = 'Hex' } = options;
    const key_ = Bytes.from(`0x${key.key()}`);
    const encKey = Bytes.slice(key_, 0, 16);
    const macKey = Bytes.slice(key_, 16, 32);
    const ciphertext = Bytes.from(`0x${keystore.crypto.ciphertext}`);
    const mac = Hash.keccak256(Bytes.concat(macKey, ciphertext));
    if (!Bytes.isEqual(mac, Bytes.from(`0x${keystore.crypto.mac}`)))
        throw new Error('corrupt keystore');
    const data = ctr(encKey, key.iv).decrypt(ciphertext);
    if (as === 'Hex')
        return Bytes.toHex(data);
    return data;
}
/**
 * Encrypts a private key as a [JSON keystore](https://ethereum.org/en/developers/docs/data-structures-and-encoding/web3-secret-storage/)
 * using a derived key.
 *
 * Supports the following key derivation functions (KDFs):
 * - {@link ox#Keystore.(pbkdf2:function)}
 * - {@link ox#Keystore.(scrypt:function)}
 *
 * @example
 * ```ts twoslash
 * import { Keystore, Secp256k1 } from 'ox'
 *
 * // Generate a random private key.
 * const privateKey = Secp256k1.randomPrivateKey()
 *
 * // Derive key from password.
 * const key = Keystore.pbkdf2({ password: 'testpassword' })
 *
 * // Encrypt the private key.
 * const encrypted = await Keystore.encrypt(privateKey, key)
 * // @log: {
 * // @log:   "crypto": {
 * // @log:     "cipher": "aes-128-ctr",
 * // @log:     "ciphertext": "...",
 * // @log:     "cipherparams": {
 * // @log:       "iv": "...",
 * // @log:     },
 * // @log:     "kdf": "pbkdf2",
 * // @log:     "kdfparams": {
 * // @log:       "salt": "...",
 * // @log:       "dklen": 32,
 * // @log:       "prf": "hmac-sha256",
 * // @log:       "c": 262144,
 * // @log:     },
 * // @log:     "mac": "...",
 * // @log:   },
 * // @log:   "id": "...",
 * // @log:   "version": 3,
 * // @log: }
 * ```
 *
 * @param privateKey - Private key to encrypt.
 * @param key - Key to use for encryption.
 * @param options - Encryption options.
 * @returns Encrypted keystore.
 */
export async function encrypt(privateKey, key, options = {}) {
    const { id = crypto.randomUUID() } = options;
    const key_ = Bytes.from(`0x${key.key()}`);
    const value_ = Bytes.from(privateKey);
    const encKey = Bytes.slice(key_, 0, 16);
    const macKey = Bytes.slice(key_, 16, 32);
    const ciphertext = ctr(encKey, key.iv).encrypt(value_);
    const mac = Hash.keccak256(Bytes.concat(macKey, ciphertext));
    return {
        crypto: {
            cipher: 'aes-128-ctr',
            ciphertext: Bytes.toHex(ciphertext).slice(2),
            cipherparams: { iv: Bytes.toHex(key.iv).slice(2) },
            kdf: key.kdf,
            kdfparams: key.kdfparams,
            mac: Bytes.toHex(mac).slice(2),
        },
        id,
        version: 3,
    };
}
/**
 * Derives a key from a password using [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2).
 *
 * @example
 * ```ts twoslash
 * import { Keystore } from 'ox'
 *
 * const key = Keystore.pbkdf2({ password: 'testpassword' })
 * ```
 *
 * @param options - PBKDF2 options.
 * @returns PBKDF2 key.
 */
export function pbkdf2(options) {
    const { iv, iterations = 262_144, password } = options;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex(pbkdf2_noble(sha256, password, salt, { c: iterations, dkLen: 32 })).slice(2);
    return defineKey({
        iv,
        key: () => key,
        kdfparams: {
            c: iterations,
            dklen: 32,
            prf: 'hmac-sha256',
            salt: Bytes.toHex(salt).slice(2),
        },
        kdf: 'pbkdf2',
    });
}
/**
 * Derives a key from a password using [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2).
 *
 * @example
 * ```ts twoslash
 * import { Keystore } from 'ox'
 *
 * const key = await Keystore.pbkdf2Async({ password: 'testpassword' })
 * ```
 *
 * @param options - PBKDF2 options.
 * @returns PBKDF2 key.
 */
export async function pbkdf2Async(options) {
    const { iv, iterations = 262_144, password } = options;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex(await pbkdf2Async_noble(sha256, password, salt, {
        c: iterations,
        dkLen: 32,
    })).slice(2);
    return defineKey({
        iv,
        key: () => key,
        kdfparams: {
            c: iterations,
            dklen: 32,
            prf: 'hmac-sha256',
            salt: Bytes.toHex(salt).slice(2),
        },
        kdf: 'pbkdf2',
    });
}
/**
 * Derives a key from a password using [scrypt](https://en.wikipedia.org/wiki/Scrypt).
 *
 * @example
 * ```ts twoslash
 * import { Keystore } from 'ox'
 *
 * const key = Keystore.scrypt({ password: 'testpassword' })
 * ```
 *
 * @param options - Scrypt options.
 * @returns Scrypt key.
 */
export function scrypt(options) {
    const { iv, n = 262_144, password } = options;
    const p = 8;
    const r = 1;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex(scrypt_noble(password, salt, { N: n, dkLen: 32, r, p })).slice(2);
    return defineKey({
        iv,
        key: () => key,
        kdfparams: {
            dklen: 32,
            n,
            p,
            r,
            salt: Bytes.toHex(salt).slice(2),
        },
        kdf: 'scrypt',
    });
}
/**
 * Derives a key from a password using [scrypt](https://en.wikipedia.org/wiki/Scrypt).
 *
 * @example
 * ```ts twoslash
 * import { Keystore } from 'ox'
 *
 * const key = await Keystore.scryptAsync({ password: 'testpassword' })
 * ```
 *
 * @param options - Scrypt options.
 * @returns Scrypt key.
 */
export async function scryptAsync(options) {
    const { iv, n = 262_144, password } = options;
    const p = 8;
    const r = 1;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex(await scryptAsync_noble(password, salt, { N: n, dkLen: 32, r, p })).slice(2);
    return defineKey({
        iv,
        key: () => key,
        kdfparams: {
            dklen: 32,
            n,
            p,
            r,
            salt: Bytes.toHex(salt).slice(2),
        },
        kdf: 'scrypt',
    });
}
///////////////////////////////////////////////////////////////////////////
/** @internal */
function defineKey(key) {
    const iv = key.iv ? Bytes.from(key.iv) : Bytes.random(16);
    return { ...key, iv };
}
//# sourceMappingURL=Keystore.js.map