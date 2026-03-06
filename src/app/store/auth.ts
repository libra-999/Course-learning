import { defineStore } from 'pinia'
import { isLogin, isLogout } from '@/app/utils/session';

export interface User {
	username: string // username ( less than 14 lengths )
	password: string // hash password
}

export const loginStore = defineStore('userLogin', {
  state: (): User => ({
    username: '',
    password: ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.username && !!state.password,
  },
  actions: {
    login(user: User, remember: boolean = false) {
      this.username = user.username;
      this.password = user.password;
      isLogin(remember, user);
    },
    logout() {
      this.username = '';
      this.password = '';
      isLogout();
    }
  }
});
