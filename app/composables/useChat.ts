import type { ChatMessage, Chat } from '~/types';
import { MOCK_CHAT } from './mockData';

export default () => {
  const chat = ref<Chat>(MOCK_CHAT);
  const messages = computed<ChatMessage[]>(() => chat.value.messages);

  const _createMessage = (message: string, role: ChatMessage['role']) => {
    const id = messages.value.length.toString();

    return { id, role, content: message };
  };

  const sendMessage = async (message: string) => {
    messages.value.push(_createMessage(message, 'user'));

    const data = await $fetch<ChatMessage>('/api/ai', {
      method: 'POST',
      body: {
        messages: messages.value,
      },
    });

    messages.value.push(data);
  };

  return {
    chat,
    messages,
    sendMessage,
  };
};
