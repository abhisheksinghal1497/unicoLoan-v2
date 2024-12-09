// import CryptoJS from "react-native-crypto-js";
import CryptoJS from "crypto-js";
import { RSA } from 'react-native-rsa-native';
import { randomBytes } from 'react-native-randombytes';




// Define constants for encryption
const SECRET_KEY = "Q0pIWkxOTzRSRkFQNUdOMQ==";
const IV = SECRET_KEY.slice(0, 16); // IV should be the first 16 bytes of the key
const IV_SIZE = 16;

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIICCgKCAgEA030GdFGPCl4oRA0xKmFWdrrqUXb970J6gEzsu2V4Co6QcMEZiwzs
UU9iUuk7IqX63+KVu2OK2xqzojfjnYKD5VG5HyHIrZw5uNXJOrcgDK+hvhmAc8sZ
ylXojRDMnHROp30BrmC1McExD4a0W8MVNi6wqYjG/0QA78bpI5j3rMlvHaF8JthG
Fw90NvhTHsiUvH7lBeYSz0iNBGgTRpBV54iU6PkkZyjJq479GWa68EPB415HEP70
QvkT6lawsl9gbjGZ90qFSf0VbjQDa1VVYGRd3veUS948bsiEz5Y+ofnXUWqylyHm
I1tr/Cwxzq+AA4sNTiWvS4E5hiQI4BAzpWjrm1YPWPtmXgrjF0LfojvKWt+no9xy
X4/PqCBAZsMmVA0Y14IDL0OrFzqgF/TgbvEt9B5osx77E+Viugiy3Zx6q/JFoWNI
mxL4kiexuK7WfevYkBdpB4o1LW5EGppcpS7xq2X1UtV5mmYhlvtaEIP67jbpYok1
WVk2Fr+1SVGhk69SzNF1d3tBefu6gzjUoMMhr6RXphaCUf/TJfa4zX7otcSDIWzs
Hc23gQcJvPVzdta/CRY0tSERknVG3fhGHhIXPtzmVRj3IblSfiamsczvtdD+5tfV
MPIvh06pRcZ+/PU2WEdEojwksCWv7U4YhXxvTOZL4VnP4vjpPo4+9usCAwEAAQ==
-----END RSA PUBLIC KEY-----`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;

export const encryptAES = (plaintext, base64EncodedKey) =>{

    const keyBytes = CryptoJS.enc.Base64.parse(base64EncodedKey);
    const iv = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, IV_SIZE / 4));

    // const iv = CryptoJS.lib.WordArray.random(16);

    const encrypted = CryptoJS.AES.encrypt(
        plaintext,
        keyBytes,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const combined = iv.concat(encrypted.ciphertext);
    return CryptoJS.enc.Base64.stringify(combined);
    // return 'ajANSjs'
}

export const decryptAES =(ciphertext, base64EncodedKey)=> {
    const combinedBytes = CryptoJS.enc.Base64.parse(ciphertext);
    const ivBytes = CryptoJS.lib.WordArray.create(combinedBytes.words.slice(0, IV_SIZE / 4));
    const ciphertextBytes = CryptoJS.lib.WordArray.create(combinedBytes.words.slice(IV_SIZE / 4));

    const keyBytes = CryptoJS.enc.Base64.parse(base64EncodedKey);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertextBytes },
        keyBytes,
        { iv: ivBytes, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}


export const decryptData = (encryptedText = "") => {
    const base64EncodedKey = 'Q0pIWkxOTzRSRkFQNUdOMQ==';

    // const encryptFedText = encryptAES(plaintext, base64EncodedKey);
    // console.log('Encrypted:', encryptedText);

    const decryptedText = decryptAES("K53gwKPO+6cZzlhR8jY56vQAZeZGTqdk7ymGKhtSvWipZO4TKsfwq6TSO+ebQm4TN1GyytOtbYZBEY+VSxX+e9LEed/JXALI62i+eTML3E4p6gl3od1ucJe3PoFUwAuJ9Yh+XYdNiKKt7UVqEoQ1PWC4s/MfDjOJBvz9gerr5k8=", base64EncodedKey);
    console.log('Decrypted:', decryptedText);
};


export const encryptData = async (payload) => {
    const SECRET_KEY = await generateRandomKey(16)

    const encrypt_data = encryptAES(JSON.stringify(payload), SECRET_KEY)

    const rsa_encrypt_payload = JSON.stringify(
        {
            enycryptPayload: encrypt_data,
            salt: SECRET_KEY

        }
    )

    const rsa_encrypt = await encryptWithRSA(rsa_encrypt_payload)

    console.log("rsa_encrypt>>>>", rsa_encrypt)

    const rsa_decrypt = await decryptWithRsa(rsa_encrypt)

    const decrypt_payload = JSON.parse(rsa_decrypt)
    console.log("decrypt_payload", decrypt_payload)



    const decrypt_data = decryptAES(decrypt_payload?.enycryptPayload, decrypt_payload?.salt)
    console.log("hari>>>>final >>>decrypt_data", decrypt_data)

}


export const encryptWithRSA = async (data) => {
    return new Promise(async (resolve, reject) => {




        RSA.encrypt(data, publicKey)
            .then(encodedMessage => {
                // console.log(`the encoded message is ${encodedMessage}`);
                resolve(encodedMessage)

            }).catch((error) => {
                reject(error)
            });


    })
}

export const decryptWithRsa = async (data) => {
    return new Promise((resolve, reject) => {
        RSA.decrypt(data, privateKey)
            .then(decryptedMessage => {
                resolve(decryptedMessage)
            }).catch((error) => {
                reject(error)
            });
    })

}

const generateRandomKey = (length) => {
    // Create a Uint8Array with the specified length
    return new Promise((resolve, reject) => {
        randomBytes(length, (err, bytes) => {
            if (err) {
                resolve(SECRET_KEY)
            } else {
                const base64Key = Buffer.from(bytes).toString('base64');
                resolve(base64Key);
            }
        });
    });
};


// const generateRandomKey = (length) => {
//     // const randomWords = CryptoJS.lib.WordArray.random(length);
//     // return randomWords.toString(CryptoJS.enc.Base64); // You can use Base64 or Hex encoding

    
// };