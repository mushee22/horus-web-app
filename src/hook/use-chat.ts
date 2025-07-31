'use client'

import { ChatContext } from '@/context/chat-context';
import { useContext } from 'react';

export default function useChat() {
    return useContext(ChatContext);
}