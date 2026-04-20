export interface Message {
    id: number
    role: 'user' | 'assistant'
    content: string
    loading: boolean
    timestamp: number
}

export interface QuickPrompt {
    icon: string
    label: string
    text: string
}