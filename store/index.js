
import axios from 'axios' 
const crypto = require('crypto')
export const state = () => ({
  isAuth: false,
  biggerScreen: true,
  user:"",

})

export const mutations = {
  setAuth: function (state, auth) {
    state.isAuth = auth
  },
  setBiggerScreen: function (state, biggerScreen) {
    state.biggerScreen = biggerScreen
  },
  setUser: function (state, user) {
    state.user = user
  },
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { app }) {
        let isAuth = false;
        let user=null;
        if (app.$cookies.get('_sessionId') != "") {
          try {
              let mykey = crypto.createDecipher('aes-128-ecb', '123');
              let cookieVal= mykey.update(app.$cookies.get('_sessionId'), 'hex','utf8');
              cookieVal+=mykey.final('utf8');
              const session=JSON.parse(cookieVal)
              if(session.userEmail != "" && session.userPass != "")
              {
                isAuth = true
                user = session.userEmail;
              }
          } catch (err) {
            // No valid cookie found
          }
        }
        commit('setAuth', isAuth)
        commit('setUser', user);

      }

}
