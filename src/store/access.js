import { defineStore } from 'pinia'

export const useAccessStore = defineStore('access', {
  state: () => ({
    access_token: "",
    user: {
      name: "",
      profilePicture: "",
      auth: false,
    },
  }),
  persist: true,
  actions: {
    setAccessToken(token) {
      this.access_token = token;
    },
    setUserProps(displayName, profilePicture, auth) {
      this.user.name = displayName;
      this.user.profilePicture = profilePicture;
      this.user.auth = auth;
    },
    setAuth(auth) {
      this.user.auth = auth;
    },
  },
  getters: {
    getAccessToken() {
      return this.access_token;
    },
    getUserProps() {
      return this.user;
    }
  },
})
