<template>
    <div class="chat-wrapper">
        <!-- button to open chat-->
        <Transition name="box">
            <ButtonGlobal value="" v-if="!isOpen" class="chat-box" @click.prevent="openChat">
                <template #icon-left>
                    <img :src="LogoChatAI" />
                </template>
            </ButtonGlobal>
        </Transition>

        <!-- conversation -->
        <Transition name="window">
            <div v-if="isOpen" class="chat-window">
                <!--  navbar conversation-->
                <header class="chat-header">
                    <div class="chat-header__left">
                        <div class="c-avatar">
                            <img :src="LogoChatAI" @click="clearMessage" />
                        </div>
                        <div class="chat-header__meta">
                            <p class="chat-header__name">Lemon Assistant</p>
                            <p class="chat-header__status">
                                <span class="chat-header__status-dot" />
                                Online
                            </p>
                        </div>
                    </div>

                    <div class="chat-header__actions">
                        <ButtonGlobal value="" class="icon-btn icon-btn--close" @click.prevent="closeChat">
                            <template #icon-right>
                                <CloseBold />
                            </template>
                        </ButtonGlobal>
                    </div>
                </header>

                <!-- welcome converstat and recommend topic -->
                <section class="messages" ref="messagesEl">
                    <!-- Welcome title -->
                    <div v-if="messages.length === 0" class="welcome">
                        <div class="welcome__orb">
                            <svg viewBox="0 0 100 100" fill="none">
                                <defs>
                                    <radialGradient id="orb" cx="50%" cy="50%">
                                        <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35" />
                                        <stop offset="100%" stop-color="#6366f1" stop-opacity="0" />
                                    </radialGradient>
                                    <linearGradient id="orbRing" x1="0" y1="0" x2="100" y2="100">
                                        <stop offset="0%" stop-color="#38bdf8" />
                                        <stop offset="100%" stop-color="#6366f1" />
                                    </linearGradient>
                                </defs>
                                <circle cx="50" cy="50" r="46" fill="url(#orb)" />
                                <circle cx="50" cy="50" r="46" stroke="url(#orbRing)" stroke-width="1.5"
                                    stroke-dasharray="8 5" />
                                <path d="M33 44a17 17 0 1 1 34 0v3a17 17 0 0 1-34 0v-3z" fill="url(#orbRing)"
                                    opacity="0.9" />
                            </svg>
                        </div>
                        <h4 class="welcome__title">Hello! 👋</h4>
                        <p class="welcome__sub">Ask me anything about our community.</p>
                        <ul class="quick-list">
                            <li v-for="p in quickPrompts" :key="p.label" class="quick-list__item"
                                @click="sendQuickPrompt(p.text)">
                                <span class="quick-list__emoji">{{ p.icon }}</span>
                                <span>{{ p.label }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Message bubbles -->
                    <TransitionGroup v-else name="msg" tag="div" class="message-list">
                        <div v-for="msg in messages" :key="msg.id" class="msg-row" :class="`msg-row--${msg.role}`">
                            <div v-if="msg.role === 'assistant'" class="msg-avatar">
                                <img :src="LogoChatAI" />
                            </div>
                            <div class="msg-content">
                                <div class="bubble" :class="`bubble--${msg.role}`">
                                    <span v-if="msg.loading" class="typing">
                                        <span></span><span></span><span></span>
                                    </span>
                                    <span v-else class="bubble__text">{{ msg.content }}</span>
                                </div>
                                <time class="msg-time">{{ formatTime(msg.timestamp) }}</time>
                            </div>
                        </div>
                    </TransitionGroup>
                </section>

                <!-- Prompt your content -->
                <footer class="chat-footer">
                    <div class="input-wrap" :class="{ 'input-wrap--focused': inputFocused }">
                        <textarea ref="inputEl" v-model="inputText" class="chat-textarea" placeholder="Ask anything…"
                            rows="1" @keydown.enter.exact.prevent="sendMessage" @focus="inputFocused = true"
                            @blur="inputFocused = false" @input="autoResize" />

                        <ButtonGlobal value="" class="send-btn" :class="{ 'send-btn--active': canSend }"
                            :disabled="!canSend" @click.prevent="sendMessage">
                            <template #icon-left>
                                <Position />
                            </template>
                        </ButtonGlobal>
                    </div>
                </footer>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import ButtonGlobal from '@/app/components/button/ButtonGlobal.vue'
import { ref, computed, nextTick } from 'vue'
import { CloseBold, Position } from '@element-plus/icons-vue'
import LogoChatAI from "@/app/assets/image/live_chat_AI.gif"
import type { Message, QuickPrompt } from '@/modules/types/chat'


const isOpen = ref<boolean>(false)
const inputFocused = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const unreadCount = ref<number>(1)
const inputText = ref<string>('')
const messages = ref<Message[]>([])


const messagesEl = ref<HTMLElement | null>(null)
const inputEl = ref<HTMLTextAreaElement | null>(null)

const quickPrompts: QuickPrompt[] = [
    { icon: '💬', label: 'What can you help with?', text: 'What can you help me with?' },
]

const canSend = computed<boolean>(() => inputText.value.trim().length > 0 && !isLoading.value)

const formatTime = (ts: number): string =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const scrollToBottom = async (): Promise<void> => {
    await nextTick()
    if (messagesEl.value) messagesEl.value.scrollTop = messagesEl.value.scrollHeight
}

const autoResize = (): void => {
    const el = inputEl.value
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 124)}px`
}
const openChat = (): void => {
    isOpen.value = true
    unreadCount.value = 0
    nextTick(() => inputEl.value?.focus())
}

const closeChat = (): void => { isOpen.value = false }

const sendQuickPrompt = (text: string): void => {
    inputText.value = text
    sendMessage()
}

const sendMessage = async (): Promise<void> => {
    const text = inputText.value.trim()
    if (!text || isLoading.value) return

    messages.value.push({
        id: Date.now(), role: 'user', content: text, loading: false, timestamp: Date.now(),
    })

    inputText.value = ''
    if (inputEl.value) inputEl.value.style.height = 'auto'
    await scrollToBottom()

    isLoading.value = true
    const loadingId = Date.now() + 1
    messages.value.push({
        id: loadingId, role: 'assistant', content: '', loading: true, timestamp: Date.now(),
    })
    await scrollToBottom()

    const contents = messages.value
        .filter((m) => !m.loading)
        .map((m) => ({
            role: m.role === 'assistant' ? 'model' : 'user', // Gemini uses user/model
            parts: [{ text: m.content }],
        }))

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                systemInstruction: {
                    parts: [
                        {
                            text: `You are a helpful community assistant. Always respond in Chinese script. If a technical word is unclear in Chinese, keep the English term in parentheses.`.trim(),
                        },
                    ],
                },
                contents,
                generationConfig: {
                    maxOutputTokens: 100000,
                },
            }),
        }
    )

    const data = await response.json()   
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'សុំទោស ខ្ញុំមិនអាចឆ្លើយបានទេ។'
    const idx = messages.value.findIndex((m) => m.id === loadingId)
    if (idx !== -1) {
        messages.value[idx] = {
            id: loadingId, role: 'assistant', content: reply ?? '', loading: false, timestamp: Date.now(),
        }
    }

    isLoading.value = false
    await scrollToBottom()
    inputEl.value?.focus()
}

const clearMessage = () => {
    messages.value = []
}
</script>

<style lang="scss" scoped>
// chat container
.chat-wrapper {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 99;
}

// open window and chat box 
.chat-box {
    position: relative;
    width: 62px;
    height: 62px;
    border-radius: 50%;
    border: none;
    background: white;
    cursor: pointer;
    @include flex-center;
    transition: transform .25s cubic-bezier(.34, 1.56, .64, 1), box-shadow .25s ease;

    & img {
        transform: scale(2.5) translateY(-10px);
    }
}

.chat-window {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 330px;
    height: 450px;
    background: var(--background-color);
    border-radius: .5rem;
    box-shadow: $shadow;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: width .35s cubic-bezier(.34, 1.2, .64, 1), height .35s cubic-bezier(.34, 1.2, .64, 1);

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 0;
        border-radius: inherit;
    }

    &--max {
        width: min(700px, calc(100vw - 32px));
        height: min(820px, calc(100vh - 56px));
    }
}

.chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    border-bottom: 1px solid $border;
    flex-shrink: 0;
    position: relative;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        border-radius: .8rem .8rem 0 0;
    }

    &__left {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    &__name {
        font-size: 14px;
        font-weight: 600;
        margin: 0;
        letter-spacing: -.015em;
    }

    &__status {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        color: $muted;
        margin: 0;
    }

    &__status-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: $green;
        flex-shrink: 0;
        animation: blink 2.2s ease-in-out infinite;
    }

    &__actions {
        display: flex;
        gap: 4px;
    }
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: .3;
    }
}

// open window component
.c-avatar {
    position: relative;
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    cursor: pointer;
    &__dot {
        position: absolute;
        bottom: 1px;
        right: 1px;
        width: 11px;
        height: 11px;
        background: $green;
        border-radius: 50%;
        border: 2.5px solid $bg-3;
    }
}

.icon-btn {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: $muted;
    border-radius: $radius-sm;
    @include flex-center;
    cursor: pointer;
    transition: background .15s, color .15s;

    &:hover {
        background: $surface;
        color: $text;
    }

    &--close:hover {
        background: rgba($red, .12);
        color: $red;
    }
}

// message history or recommend 
.messages {
    flex: 1;
    overflow-y: auto;
    padding: 20px 16px;
    scroll-behavior: smooth;
    position: relative;
    z-index: 1;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 4px;
    }
}

.welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 16px;
    gap: 10px;

    &__orb {
        width: 90px;
        height: 90px;
        animation: float 3.5s ease-in-out infinite;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    &__title {
        font-size: 20px;
        font-weight: 700;
        margin: 4px 0 0;
        @include gradient-text;
    }

    &__sub {
        font-size: 13px;
        color: $muted;
        margin: 0 0 8px;
        line-height: 1.5;
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-10px);
    }
}

.quick-list {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;

    &__item {
        display: flex;
        align-items: center;
        gap: 10px;
        border: 0.3px solid #b9b9b946;
        border-radius: 12px;
        padding: 11px 14px;
        font-size: 13px;
        cursor: pointer;
        text-align: left;
        transition: background .15s, border-color .15s, transform .18s;

        &:hover {
            border-color: rgba($primary, .4);
            transform: translateX(5px);
        }
    }

    &__emoji {
        font-size: 16px;
        flex-shrink: 0;
    }
}

.message-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.msg-row {
    display: flex;
    gap: 9px;
    align-items: flex-end;

    &--user {
        flex-direction: row-reverse;
    }
}

.msg-avatar {
    width: 32px;
    height: 32px;
    flex-shrink: 0;
}

.msg-content {
    display: flex;
    flex-direction: column;
    max-width: 76%;
    gap: 4px;

    .msg-row--user & {
        align-items: flex-end;
    }
}

// response chat 
.bubble {
    padding: .3rem .8rem;
    border-radius: .8rem;
    font-size: 13.5px;
    line-height: 1.6;
    text-align: start;


    &--assistant {
        border-bottom-left-radius: 4px;
        border: 1px solid #b9b9b93c;
    }

    &--user {
        border-bottom-right-radius: 4px;
        border: 1px solid #b9b9b9c9;
        color: var(--text-color);
        background: rgba(34, 238, 75, 0.819);
    }

    &__text {
        word-break: break-word;
        white-space: pre-wrap;
    }
}

.msg-time {
    font-size: 10px;
    color: $muted;
    padding: 0 2px;
}

// waiting respond
.typing {
    display: flex;
    gap: 5px;
    align-items: center;
    height: 22px;
    padding: 0 2px;

    span {
        width: 6px;
        height: 6px;
        background: rgba($primary, .7);
        border-radius: 50%;
        animation: dot 1.3s ease-in-out infinite;

        &:nth-child(2) {
            animation-delay: .2s;
        }

        &:nth-child(3) {
            animation-delay: .4s;
        }
    }
}

@keyframes dot {

    0%,
    80%,
    100% {
        transform: scale(.65);
        opacity: .4;
    }

    40% {
        transform: scale(1);
        opacity: 1;
    }
}

// Footer
.chat-footer {
    padding: 12px 14px 16px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    position: relative;
    z-index: 1;

    &__hint {
        font-size: 10.5px;
        color: $muted;
        margin: 0;
        text-align: center;
    }
}

.input-wrap {
    display: flex;
    align-items: flex-end;
    gap: 0.2rem;
    border: 1.5px solid var(--background-box-color);
    border-radius: 0.5rem;
    padding: 9px 9px 9px 14px;
    transition: border-color .2s, box-shadow .2s;

    &--focused {
        border-color: rgba($primary, .55);
        box-shadow: 0 0 0 3px rgba($primary, .1);
    }
}

.chat-textarea {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    font-size: 13.5px;
    line-height: 1.55;
    resize: none;
    max-height: 124px;
    overflow-y: auto;
    padding: 0;

    &::placeholder {
        color: var(--text-color);
    }
}

.send-btn {
    width: 36px;
    height: 36px;
    background: var(--text-color);
    border-radius: $radius-sm;
    border: none;
    color: white;
    @include flex-center;
    flex-shrink: 0;
    cursor: not-allowed;
    transition: background .2s, color .2s, transform .15s, box-shadow .2s;

    &--active {
        background: linear-gradient(135deg, $gray, $surface);
        cursor: pointer;
    }
}

// Transitions 
.msg-enter-active {
    animation: msgIn .3s cubic-bezier(.34, 1.56, .64, 1) both;
}

.msg-leave-active {
    animation: msgIn .2s ease-in reverse both;
}

@keyframes msgIn {
    from {
        opacity: 0;
        transform: translateY(10px) scale(.96);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

.fab-enter-active {
    transition: all .3s cubic-bezier(.34, 1.56, .64, 1);
}

.fab-leave-active {
    transition: all .2s ease-in;
}

.fab-enter-from,
.fab-leave-to {
    opacity: 0;
    transform: scale(.6) translateY(12px);
}

.window-enter-active {
    transition: all .4s cubic-bezier(.34, 1.25, .64, 1);
}

.window-leave-active {
    transition: all .25s ease-in;
}

.window-enter-from,
.window-leave-to {
    opacity: 0;
    transform: scale(.82) translateY(24px);
    transform-origin: bottom right;
}
</style>