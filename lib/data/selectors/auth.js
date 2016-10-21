import { createSelector } from 'reselect'

const authToken = (state) => state.auth.token
const authError = (state) => state.auth.error

export const token = createSelector(
  authToken
)

export const error = createSelector(
  authError
)
