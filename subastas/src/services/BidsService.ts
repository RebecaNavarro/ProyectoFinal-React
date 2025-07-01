import jsonInstance from "../api/jsonInstance";
const BID_URL = 'bids';

export const getBidsServicebyProductId = async (productId: string) => {
    try {
        const response = await jsonInstance.get(BID_URL, { params: { productId } });
        return response.data;
    } catch (error) {
        console.error("Error getting bids", error);
        throw error;
    }
};

export const postBidService = async (bid: any) => {
    try {
        const response = await jsonInstance.post(BID_URL, bid);
        return response.data;
    } catch (error) {
        console.error("Error posting bid", error);
        throw error;
    }
};