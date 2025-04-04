import crypto from "crypto";

export const generateSignature = (userSecretKey: string, timestamp: Date): { timestamp: Date; signature: string } => {
    try {
        const signature = crypto
            .createHmac("sha256", userSecretKey)
            .update(timestamp.toISOString())
            .digest("hex");

        return { timestamp, signature };
    } catch (error) {
        throw new Error("Failed to sign the request");
    }
};