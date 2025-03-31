import axios from 'axios';

const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL;

// Create axios instance with proper headers
const pinataAPI = axios.create({
    baseURL: 'https://api.pinata.cloud',
    headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
        'Content-Type': 'application/json'
    }
});

export const testPinataConnection = async () => {
    try {
        const response = await pinataAPI.get('/data/testAuthentication');
        return response.data.authenticated;
    } catch (error) {
        console.error('Pinata connection test failed:', error);
        return false;
    }
};

export const uploadToPinata = async (data) => {
    try {
        // Convert data to JSON blob
        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: 'application/json' });

        // Create FormData for proper file upload
        const formData = new FormData();
        formData.append('file', blob, 'user-auth.json');
        formData.append('pinataMetadata', JSON.stringify({
            name: `auth-${Date.now()}`
        }));

        const response = await pinataAPI.post('/pinning/pinFileToIPFS', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return {
            cid: response.data.IpfsHash,
            gatewayUrl: `${GATEWAY_URL}/ipfs/${response.data.IpfsHash}`
        };
    } catch (error) {
        console.error('Pinata upload error:', error);
        throw new Error('Failed to upload to Pinata. Please check your credentials.');
    }
};

export default {
    testConnection: testPinataConnection,
    upload: uploadToPinata
};