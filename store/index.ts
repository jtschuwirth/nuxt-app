import { GetterTree, ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  account: "Not Connected",
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setAccount(state, account: string) {
    state.account = account
  },
}

export const getters: GetterTree<RootState, RootState> = {
    getAccount: (state) => state.account,
}
  
