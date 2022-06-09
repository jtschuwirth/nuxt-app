export const state = () => ({
  account: "Not Connected",
  chainId: null,
})



export const mutations = {
  setAccount(state, account) {
    state.account = account
  },
  setChainId(state, chainId) {
    state.chainId = chainId
  },
}

export const getters = {
    getAccount: (state) => state.account,
    getChainId: (state) => state.chainId,
}
  
