export type Response<T> = {
    message: string,
    resp_code: number,
    data?: T
}


export type CourseProgress = {
    total_subchapters: number,
    completed_subchapters: number,
    last_watched_sub_chapter?: SubChapter
}

export type Progress = {
    id: number
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    is_completed: boolean
    watched_duration: number
    last_watched_at: string
    student: number
    sub_chapter: number
}

export type Chapter = {
    id: number
    total_subchapters: number
    completed_subchapters: number
    total_duration: number
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    title: string
    thumbnail: string
    description: string
    duration: number
    order: number
}

export type SubChapter = {
    id: number
    chapter_name: string
    is_completed: boolean
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    title: string
    description: string
    video: string
    thumbnail: string
    duration: number
    order: number
    chapter: number,
    progress: Progress | null
}

export interface Student {
    id: number
    // purchases: any[]
    user: User
    created_date: string
    created_time: string
    modified_date: string
    modified_time: string
    is_active: boolean
    group_code?: string
    profile_image?: string
    student_bio?: string
}

export interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
    is_admin: boolean
}

export interface Batch {
    id: number;
    name: string;
    code: string;
    created_date: string;
    created_date: string;
    created_time: string;
    modified_date: string;
    modified_time: string;
}

export interface Package {
    id: number;
    thumbnail: string;
    price: string;
}

export interface Community {
    id: number,
    name: string,
    default_name: string;
    type: Global | Package | Batch;
    created_date: string;
    created_date: string;
    created_time: string;
    modified_date: string;
    modified_time: string;
    pacakge: Package | null;
    batch: Batch | null;
    profile_image: string;
    last_message: Message | null;
    unread_count: number;
}

export interface MessageWithDate {
    date: string;
    messages: Message[];
}

export interface ChatRoom  {
    count: number,
    next: string | null,
    previous: string | null,
    results: {
        community: Community,
        data: MessageWithDate[]
    }
}

export interface Message {
    id: number,
    community: Community,
    content: string;
    created_date: string;
    created_date: string;
    created_time: string;
    modified_date: string;
    modified_time: string;
    time: string;
    sender: Student;
    image?: string;
}



// Chat context

export interface ChatContextState {
    messages: Record<number, MessageWithDate[]>;
    community?: Community;
    isLoadingMessage: boolean;
    onSendMessage?: () => void;
    onEmojiClick?: (emoji: string) => void;
    onInput?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onEnterKeyPress?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onMediaPick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setMessageInput?: (value: React.SetStateAction<UserInput>) => void;
    fetchNextPage?: () => void;
    isNextPageAvilable?: boolean;
    isSendingMessage: boolean;
    userInput: UserInput;
    inpuRef?: React.RefObject<HTMLTextAreaElement | null>;
    messageContainerRef?: React.RefObject<HTMLDivElement | null>
    user: Student | null;
    roomName?: string;
}

interface Media {
    caption?: string;
    url?: string;
    type?: "image" | "video";
    file?: File;
    props?: {
        width?: number;
        height?: number;
        size?: number;
        mime_type?: string;
        name?: string;
        duration?: number;
        extension?: string;
    }
}


export interface UserInput {
    text?: string;
    media?: Media;
    type: "text" | "image";
    error?: string;
}