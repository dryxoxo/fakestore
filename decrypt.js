import * as CryptoJS from "crypto-js";

const encryptionKey = CryptoJS.enc.Utf8.parse('a3bb59387027cb6ece28280a40e6a344');
const iv = CryptoJS.enc.Utf8.parse('BerijalanDPA2023');

function decryptAES256(ciphertextHex) {
    console.log("Ciphertext Hex:", ciphertextHex);

    try {
        const decrypted = CryptoJS.AES.decrypt({
            ciphertext: CryptoJS.enc.Hex.parse(ciphertextHex)
        }, encryptionKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        console.log("Decrypted Data (Raw):", decrypted);
        console.log("Decrypted Data (UTF-8):", decrypted.toString(CryptoJS.enc.Utf8));

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Error decrypting:", error);
        return "";
    }
}

export function decryptAES256ByKey(keyname) {
    const plainText = decryptAES256(keyname);
    return plainText;
}

function encryptAES256(plainText) {
    const encrypted = CryptoJS.AES.encrypt(plainText, encryptionKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Hex);
}

export function encryptAES256ByKey(keyname) {
    const encText = encryptAES256(keyname);
    console.log(`enctText ${encText}`);
}

