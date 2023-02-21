import { defineStore } from 'pinia';
interface State {
  loginState: boolean;
}
const useLoginStore = defineStore('login', {
  state: (): State => {
    return {
      loginState: false,
    };
  },
  getters: {},
  actions: {
    changeLoginState() {
      this.$state.loginState = !this.$state.loginState;
      console.log('  this.$state.loginState', this.$state.loginState);
    },
  },
});

export default useLoginStore;
