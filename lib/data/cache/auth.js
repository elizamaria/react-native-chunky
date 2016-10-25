import { AsyncStorage } from 'react-native'
import * as Config      from '../../config'
import * as Errors      from '../../errors'

export function retrieveAuthToken() {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(Config.AUTH_TOKEN_CACHE_KEY, (error, authToken) => {
      if (error || !authToken) {
        // The token was not found locally
        reject(Errors.COULD_NOT_RETRIEVE_CACHED_TOKEN)
        return
      }
      resolve(authToken)
    })
  })
}

export function cacheAuthToken(token) {
  return new Promise((resolve, reject) => {
    AsyncStorage.setItem(Config.AUTH_TOKEN_CACHE_KEY, `${token.key}`, (error) => {

      if (error) {
        // Something went wrong when saving the token
        reject(error)
        return;
      }

      // We're good to go, let's send back the newly received token
      resolve(token)
    })
  })
}

export function clearAuthToken() {
  return new Promise((resolve, reject) => {
    AsyncStorage.removeItem(Config.AUTH_TOKEN_CACHE_KEY, (error) => {
      if (error) {
        // The token could not be removed
        reject(Errors.COULD_NOT_CLEAR_CACHED_TOKEN)
        return
      }
      resolve()
    })
  })
}
