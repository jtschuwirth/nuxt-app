export const state = () => ({
  account: "Not Connected",
})

export const mutations = {
  setAccount(state, account) {
    state.account = account
  },
}

export const getters = {
    getAccount: (state) => state.account,
}
  
