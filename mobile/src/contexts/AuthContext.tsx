import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

import { API } from '../services/API'

interface IUserProps {
  name: string
  avatarUrl: string
}

export interface IAuthContextDataProps {
  user: IUserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IAuthContextDataProps)

export function AuthContextProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUserProps>({} as IUserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  async function signIn() {
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true)

      const userTokenResponse = await API.post('/auth', { access_token })

      API.defaults.headers.common['Authorization'] = `Bearer ${userTokenResponse.data.token}`

      const userInfoResponse = await API.get('/me')

      setUser(userInfoResponse.data.user)

      console.log(user)
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      setIsUserLoading(false)
    }
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  // console.log(AuthSession.makeRedirectUri({ useProxy: true }));

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
