
import { orderCompare } from './Common';
import { getChatOrder } from './Chat';
import ChatStore from '../Stores/ChatStore';

export function getArchiveTitle() {
    const archive = ChatStore.chatList.get('chatListArchive');
    const chats = [];
    const chatsOrder = [];
    if (archive) {
        for (const chatId of archive.keys()) {
            const chat = ChatStore.get(chatId);
            if (chat) {
                const order = getChatOrder(chatId, { '@type': 'chatListArchive' });
                if (order !== '0') chats.push(chat);
                chatsOrder.push({ order, id: chatId, title: chat.title });
            }
        }
    }

    const orderedChats = chats.sort((a, b) => orderCompare(getChatOrder(b, { '@type': 'chatListArchive' }), getChatOrder(a, { '@type': 'chatListArchive' })));

    return orderedChats.map(x => x.title).join(', ');
}
