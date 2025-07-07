"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = decrypt;
exports.encrypt = encrypt;
exports.pbkdf2 = pbkdf2;
exports.pbkdf2Async = pbkdf2Async;
exports.scrypt = scrypt;
exports.scryptAsync = scryptAsync;
const aes_1 = require("@noble/ciphers/aes");
const pbkdf2_1 = require("@noble/hashes/pbkdf2");
const scrypt_1 = require("@noble/hashes/scrypt");
const sha2_1 = require("@noble/hashes/sha2");
const Bytes = require("./Bytes.js");
const Hash = require("./Hash.js");
async function decrypt(keystore, key, options = {}) {
    const { as = 'Hex' } = options;
    const key_ = Bytes.from(`0x${key.key()}`);
    const encKey = Bytes.slice(key_, 0, 16);
    const macKey = Bytes.slice(key_, 16, 32);
    const ciphertext = Bytes.from(`0x${keystore.crypto.ciphertext}`);
    const mac = Hash.keccak256(Bytes.concat(macKey, ciphertext));
    if (!Bytes.isEqual(mac, Bytes.from(`0x${keystore.crypto.mac}`)))
        throw new Error('corrupt keystore');
    const data = (0, aes_1.ctr)(encKey, key.iv).decrypt(ciphertext);
    if (as === 'Hex')
        return Bytes.toHex(data);
    return data;
}
async function encrypt(privateKey, key, options = {}) {
    const { id = crypto.randomUUID() } = options;
    const key_ = Bytes.from(`0x${key.key()}`);
    const value_ = Bytes.from(privateKey);
    const encKey = Bytes.slice(key_, 0, 16);
    const macKey = Bytes.slice(key_, 16, 32);
    const ciphertext = (0, aes_1.ctr)(encKey, key.iv).encrypt(value_);
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
function pbkdf2(options) {
    const { iv, iterations = 262_144, password } = options;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex((0, pbkdf2_1.pbkdf2)(sha2_1.sha256, password, salt, { c: iterations, dkLen: 32 })).slice(2);
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
async function pbkdf2Async(options) {
    const { iv, iterations = 262_144, password } = options;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex(await (0, pbkdf2_1.pbkdf2Async)(sha2_1.sha256, password, salt, {
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
function scrypt(options) {
    const { iv, n = 262_144, password } = options;
    const p = 8;
    const r = 1;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex((0, scrypt_1.scrypt)(password, salt, { N: n, dkLen: 32, r, p })).slice(2);
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
async function scryptAsync(options) {
    const { iv, n = 262_144, password } = options;
    const p = 8;
    const r = 1;
    const salt = options.salt ? Bytes.from(options.salt) : Bytes.random(32);
    const key = Bytes.toHex(await (0, scrypt_1.scryptAsync)(password, salt, { N: n, dkLen: 32, r, p })).slice(2);
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
function defineKey(key) {
    const iv = key.iv ? Bytes.from(key.iv) : Bytes.random(16);
    return { ...key, iv };
}
//# sourceMappingURL=Keystore.js.map