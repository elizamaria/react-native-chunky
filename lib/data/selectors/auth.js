import { createSelector } from 'reselect'

const authToken = (state) => state.auth.token

export const authTokenSelector = createSelector(
  authToken
)
