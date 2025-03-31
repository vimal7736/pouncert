import CryptoJS from 'crypto-js';
import {pinata} from "@/utils/pinataConfig.js";

export const uploadUserData = async (data) => {
    try {
        // Convert data to JSON blob
        const jsonData = JSON.stringify(data);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const file = new File([blob], 'userdata.json');

        // Upload to Pinata
        const result = await pinata.upload.public.file(file);

        // Generate gateway URL
        const gatewayUrl = `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${result.cid}`;

        return {
            cid: result.cid,
            gatewayUrl
        };
    } catch (error) {
        console.error('Error uploading to Pinata:', error);
        throw error;
    }
};

export const generateAndSendHash = (email, phone) => {
    const hash = CryptoJS.SHA256(`${email}:${phone}:${Date.now()}`).toString(CryptoJS.enc.Hex);

    // In a real app, implement email/SMS sending here
    console.log(`Hash generated: ${hash}`);
    console.log(`Would send to email: ${email} and phone: ${phone}`);

    return hash;
};