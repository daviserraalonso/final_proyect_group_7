export interface Imessage {
    id: number;
    chatId: number;
    senderId: number;
    content: string;
    createdAt: Date;
    isRead?: boolean;
}