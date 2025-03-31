import CryptoJS from 'crypto-js';

export const generateHash = (email, phone) => {
    const combinedString = `${email}${phone}:${Date.now()}`;
    return CryptoJS.SHA256(combinedString).toString('CryptoJS.env.Hex');
};

export const storeAuthHash = (hash) => {
    localStorage.setItem("authHash", hash);
};

export const validateAuthHash = (hash) => {
    return hash === localStorage.getItem("authHash");
}