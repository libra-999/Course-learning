<template>
   <div class="chat-wrapper">
      <!-- button to open chat-->
      <Transition name="box">
         <ButtonGlobal value="" v-if="!isOpen" class="chat-box" @click.prevent="openChat">
            <template #icon-left>
               <img :src="LogoChatAI"/>
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
                     <img :src="LogoChatAI" @click="clearMessage"/>
                  </div>
                  <div class="chat-header__meta">
                     <p class="chat-header__name">Lemon {{ t('BOT.robot_name') }}</p>
                     <p class="chat-header__status">
                        <span class="chat-header__status-dot" :class="{'is-offline': aiStatus !== 'Online'}"/>
                        {{ aiStatus == 'Offline' ? t('BOT.offline'): t('BOT.online') }}
                     </p>
                  </div>
               </div>
               <div class="chat-header__actions">
                  <ButtonGlobal value="" class="icon-btn icon-btn--close" @click.prevent="closeChat">
                     <template #icon-right>
                        <CloseBold/>
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
                              <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
                              <stop offset="100%" stop-color="#6366f1" stop-opacity="0"/>
                           </radialGradient>
                           <linearGradient id="orbRing" x1="0" y1="0" x2="100" y2="100">
                              <stop offset="0%" stop-color="#38bdf8"/>
                              <stop offset="100%" stop-color="#6366f1"/>
                           </linearGradient>
                        </defs>
                        <circle cx="50" cy="50" r="46" fill="url(#orb)"/>
                        <circle cx="50" cy="50" r="46" stroke="url(#orbRing)" stroke-width="1.5"
                                stroke-dasharray="8 5"/>
                        <path d="M33 44a17 17 0 1 1 34 0v3a17 17 0 0 1-34 0v-3z" fill="url(#orbRing)"
                              opacity="0.9"/>
                     </svg>
                  </div>
                  <h4 class="welcome__title">Hello! 👋</h4>
                  <p class="welcome__sub">{{  t('BOT.description') }}.</p>
                  <ul class="quick-list">
                     <li v-for="p in quickPrompts" :key="p.label"
                         :class="`quick-list__item ${aiStatus === 'Offline' ? 'cursor-not-allowed':' cursor-pointer'}`"
                         @click="aiStatus !== 'Offline' && sendQuickPrompt(p.text) ">
                        <span class="quick-list__emoji">{{ p.icon }}</span>
                        <span>{{ p.label }}</span>
                     </li>
                  </ul>
               </div>

               <!-- Message bubbles -->
               <TransitionGroup v-else name="msg" tag="div" class="message-list">
                  <div v-for="msg in messages" :key="msg.id" class="msg-row" :class="`msg-row--${msg.role}`">
                     <div v-if="msg.role === 'assistant'" class="msg-avatar">
                        <img :src="LogoChatAI"/>
                     </div>
                     <div class="msg-content">
                        <div class="bubble" :class="`bubble--${msg.role}`">
                                    <span v-if="msg.loading" class="typing">
                                        <span></span><span></span><span></span>
                                    </span>
                           <div v-else class="bubble__text" v-html="renderRawText(msg.content)"></div>
                        </div>
                        <time class="msg-time">{{ timeStampMinuteFormat (msg.timestamp) }}</time>
                     </div>
                  </div>
               </TransitionGroup>
            </section>

            <!-- Prompt your content -->
            <footer class="chat-footer">
               <div class="input-wrap" :class="{ 'input-wrap--focused': inputFocused }">
                        <textarea ref="inputEl" :disabled="aiStatus === 'Offline'" v-model="inputText"
                                  class="chat-textarea" :placeholder="t('BOT.prompt')"
                                  rows="1" @keydown.enter.exact.prevent="sendMessage" @focus="inputFocused = true"
                                  @blur="inputFocused = false" @input="autoResize"/>

                  <ButtonGlobal value="" :class="['send-btn', { 'send-btn--active': canSend }]"

                                :disabled="!canSend" @click.prevent="sendMessage">
                     <template #icon-left>
                        <Position/>
                     </template>
                  </ButtonGlobal>
               </div>
               <article class=" text-gray-400 text-[.5rem] font-bold italic">click on icon to get new chat
               </article>
            </footer>
         </div>
      </Transition>
   </div>
</template>

<script setup lang="ts">
import { CloseBold, Position } from '@element-plus/icons-vue'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import LogoChatAI from '@/app/assets/image/live_chat_AI.gif'
import ButtonGlobal from '@/app/components/Button/ButtonGlobal.vue'
import { BotApi, healthServer } from '@/modules/api/bot'
import type { Message, QuickPrompt } from '@/modules/types/chat'
import { useMessage } from '@/app/utils/message'
import { timeStampMinuteFormat } from '@/app/utils/dateFormat'
import platform from 'platform'
import { renderRawText } from '@/app/utils/common'
import { useI18n } from 'vue-i18n'


const TEXTAREA_MAX_HEIGHT = 124
const BOT_ERROR_NOTIFY = 'It has something wrong with bot, Please try again later'
const BOT_FALLBACK_REPLY = 'សុំទោស ខ្ញុំមិនអាចឆ្លើយបានទេ'
const BOT_ERROR_REPLY = 'សុំទោស ប្រព័ន្ទកំពុងមានបញ្ហា'

const { t } = useI18n()
const isOpen = ref (false)
const inputFocused = ref (false)
const isLoading = ref (false)
const inputText = ref ('')
const messages = ref<Message[]> ([])
const messagesEl = ref<HTMLElement | null> (null)
const inputEl = ref<HTMLTextAreaElement | null> (null)
const boxMessage = useMessage ()
const aiStatus = ref<"Online" | "Offline"> ("Offline")
let checkAIStatus: ReturnType<typeof setInterval> | null = null

let messageId = 0

// recommendation content
const quickPrompts: QuickPrompt[] = [
   {icon: '💬', label: 'What can you help with?', text: 'What can you help me with?'},
   {icon: '👤', label: 'Tell me about your role?', text: 'Tell me about your role?'},
   {icon: '🎯', label: 'What is purpose of this project?', text: 'What is purpose of this project?'}
]

// send message button after completed 
const canSend = computed (() => inputText.value.trim ().length > 0 && !isLoading.value)

const scrollToBottom = async (): Promise<void> => {
   await nextTick ()
   if (!messagesEl.value) return
   messagesEl.value.scrollTop = messagesEl.value.scrollHeight
}

const focusInput = (): void => {
   nextTick (() => inputEl.value?.focus ())
}

const resetInputHeight = (): void => {
   if (!inputEl.value) return
   inputEl.value.style.height = 'auto'
}

const autoResize = (): void => {
   if (!inputEl.value) return
   resetInputHeight ()
   inputEl.value.style.height = `${Math.min (inputEl.value.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`
}

const openChat = (): void => {
   isOpen.value = true
   focusInput ()
}

const closeChat = (): void => {
   isOpen.value = false
}

const sendQuickPrompt = (text: string): void => {
   inputText.value = text
   sendMessage ()
}

const createMessage = (role: Message['role'], content: string, loading = false): Message => ({
   id: ++messageId,
   role,
   content,
   loading,
   timestamp: Date.now (),
})

const buildBotContents = () =>
    messages.value.filter (({loading}) => !loading).map (({role, content}) => ({
       role: role === 'assistant' ? 'assistant' : 'user',
       content,
    }))

const replaceMessage = (id: number, payload: Partial<Omit<Message, 'id' | 'role'>>): void => {
   const idx = messages.value.findIndex ((message) => message.id === id)
   if (idx === -1) return

   // avoid idx has null index while putting in message
   const currentMsg = messages.value[idx]
   if (!currentMsg) return

   messages.value[idx] = {...currentMsg, ...payload}
}

const sendMessage = async (): Promise<void> => {
   const text = inputText.value.trim ()
   if (!text || isLoading.value) return

   messages.value.push (createMessage ('user', text))

   inputText.value = ''
   resetInputHeight ()
   await scrollToBottom ()

   isLoading.value = true
   const loadingMessage = createMessage ('assistant', '', true)
   messages.value.push (loadingMessage)
   await scrollToBottom ()

   let reply = BOT_FALLBACK_REPLY
   const device = platform.name ?? ''
   try {
      const response = await BotApi (buildBotContents (), device)
      reply = response.data.text ?? BOT_FALLBACK_REPLY
   } catch {
      reply = BOT_ERROR_REPLY
      boxMessage.notificationBox (BOT_ERROR_NOTIFY, 'error')
   } finally {
      replaceMessage (loadingMessage.id, {
         content: reply,
         loading: false,
         timestamp: Date.now (),
      })
      isLoading.value = false
   }

   await scrollToBottom ()
   focusInput ()
}

const clearMessage = (): void => {
   messages.value = []
   messageId = 0
}

const healthAI = async () => {
   try {
      const res = await healthServer ();
      aiStatus.value = res.status === 200 || res.status === 201 ? "Online" : "Offline"
   } catch {
      aiStatus.value = "Offline"
   }
}

onMounted (() => {
   healthAI ()
   checkAIStatus = setInterval (healthAI, 15000) // 15s
})

onUnmounted (() => {
   if (checkAIStatus) clearInterval (checkAIStatus) // clear interval polling
})
</script>

<style lang="scss" scoped>
.chat-wrapper {
   position: fixed;
   bottom: 28px;
   right: 28px;
   z-index: 99;
}

.chat-box {
   position: relative;
   width: 62px;
   height: 62px;
   border-radius: 50%;
   border: none;
   background: transparent;
   cursor: pointer;
   @include flex-center;
   transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease;

   img {
      transform: scale(2.5) translateY(-10px);
   }
}

.chat-window {
   position: fixed;
   resize: both;
   overflow: hidden;
   bottom: 28px;
   right: 28px;
   width: 330px;
   height: 450px;
   background: var(--background-color);
   border-radius: 0.5rem;
   box-shadow: $shadow;
   display: flex;
   flex-direction: column;
   transition: width 0.35s cubic-bezier(0.34, 1.2, 0.64, 1), height 0.35s cubic-bezier(0.34, 1.2, 0.64, 1);

   &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      border-radius: inherit;
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
      border-radius: 0.8rem 0.8rem 0 0;
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
      letter-spacing: -0.015em;
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
      animation: onlineblink 2.2s ease infinite;

      &.is-offline {
         background: #ef4444;
         animation: offlineblink 2.2s ease infinite;
      }
   }

   &__actions {
      display: flex;
      gap: 4px;
   }
}

@keyframes onlineblink {

   0%,
   100% {
      opacity: 1;
   }

   50% {
      opacity: 0.3;
   }
}

@keyframes offlineblink {

   0%,
   100% {
      opacity: 1;
   }

   50% {
      opacity: 0.3;
   }
}

.c-avatar {
   position: relative;
   width: 44px;
   height: 44px;
   flex-shrink: 0;
   cursor: pointer;
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
   transition: background 0.15s, color 0.15s;

   &:hover {
      background: $surface;
      color: $text;
   }

   &--close:hover {
      background: rgba($red, 0.12);
      color: $red;
   }
}

.messages {
   flex: 1;
   overflow: auto;
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
      animation: float 3.5s ease infinite;

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
      text-align: left;
      transition: background 0.15s, border-color 0.15s, transform 0.18s;

      &:hover {
         border-color: rgba($primary, 0.4);
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

.bubble {
   padding: 0.3rem 0.8rem;
   border-radius: 0.8rem;
   font-size: 13.5px;
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
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
   }
}

.msg-time {
   font-size: 10px;
   color: $muted;
   padding: 0 2px;
   text-align: start;
}

.typing {
   display: flex;
   gap: 5px;
   align-items: center;
   height: 22px;
   padding: 0 2px;

   span {
      width: 6px;
      height: 6px;
      background: rgba($primary, 0.7);
      border-radius: 50%;
      animation: dot 1.3s ease infinite;

      &:nth-child(2) {
         animation-delay: 0.2s;
      }

      &:nth-child(3) {
         animation-delay: 0.4s;
      }
   }
}

@keyframes dot {

   0%,
   80%,
   100% {
      transform: scale(0.65);
      opacity: 0.4;
   }

   40% {
      transform: scale(1);
      opacity: 1;
   }
}

.chat-footer {
   padding: 12px 14px 16px;
   flex-shrink: 0;
   display: flex;
   flex-direction: column;
   gap: 6px;
   position: relative;
   z-index: 1;
}

.input-wrap {
   display: flex;
   align-items: flex-end;
   gap: 0.25rem;
   border: 1.5px solid var(--background-box-color);
   border-radius: 0.5rem;
   padding: 9px 9px 9px 14px;
   transition: border-color 0.2s, box-shadow 0.2s;

   &--focused {
      border-color: rgba($primary, 0.55);
      box-shadow: 0 0 0 3px rgba($primary, 0.1);
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
   background: #21354792;
   border-radius: $radius-sm;
   border: none;
   color: white;
   margin-right: 0px;
   @include flex-center;
   flex-shrink: 0;
   cursor: not-allowed;
   transition: background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.2s;

   &--active {
      background: linear-gradient(135deg, var(--text-color), var(--text-color));
      cursor: pointer;
   }
}

.msg-enter-active {
   animation: msgIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

.msg-leave-active {
   animation: msgIn 0.2s ease-in reverse both;
}

@keyframes msgIn {
   from {
      opacity: 0;
      transform: translateY(10px) scale(0.96);
   }

   to {
      opacity: 1;
      transform: translateY(0) scale(1);
   }
}

.box-enter-active {
   transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.box-leave-active {
   transition: all 0.2s ease-in;
}

.box-enter-from,
.box-leave-to {
   opacity: 0;
   transform: scale(0.6) translateY(12px);
}

.window-enter-active {
   transition: all 0.4s cubic-bezier(0.34, 1.25, 0.64, 1);
}

.window-leave-active {
   transition: all 0.25s ease-in;
}

.window-enter-from,
.window-leave-to {
   opacity: 0;
   transform: scale(0.82) translateY(24px);
   transform-origin: bottom right;
}

@media (max-width: $screen-sm) {
   .chat-window {
      height: 100%;
      width: 100%;
      right: 0;
      bottom: 0;
   }
}
</style>
