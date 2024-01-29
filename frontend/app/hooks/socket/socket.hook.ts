import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { useToken } from '@/app/contexts/token.context';
import { Sender } from '@/app/interfaces/message/sender.interface';
import { Content } from '@/app/interfaces/message/content.interface';

interface MessageProps extends Sender, Content {}

export const useSocket = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [open, setOpen] = useState(false);
  const token = useToken();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://192.168.100.83:3288', {
      query: { token },
    });

    socketRef.current.on('message', (data: MessageProps) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socketRef.current.on('userCount', (count: number) => {
      setUserCount(count);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [token]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      const messageData: MessageProps = {
        content: currentMessage,
        sender: token,
      };
      socketRef.current.emit('message', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setCurrentMessage('');
    }
  };

  return {
    messages,
    setMessages,
    currentMessage,
    setCurrentMessage,
    userCount,
    setUserCount,
    open,
    setOpen,
    handleSendMessage,
  };
};