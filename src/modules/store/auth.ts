import { defineStore } from 'pinia'
import type { User } from '../types/auth';
import { isLogout } from '@/app/utils/authToken';
interface Auth {
  user: User | null;
  access_token: string,
}
export const loginStore = defineStore('userLogin', {
  state: (): Auth => ({
    user: null,
    access_token: ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.user
  },
  actions: {
    login(user: User, token: string) {
      this.user = user;
      this.access_token = token
    },
    logout() {
      this.user = null
      this.access_token = ''
      isLogout();
    }
  },

  // localstorage pinia (safe than localstorage default)
  persist: {
    key: 'userLogin',
    storage: sessionStorage,
    pick: ['user', 'access_token'],
  },
});
