export interface Imessagedetail {
    id: number;
    senderId: number;
    recipientId: number;
    content: string;
    sentDate: string;
    read?: boolean;
}
