import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'

import { useAuth } from '../hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthScreen } from '../screens/AuthScreen'

export default function Routes() {
  const { user } = useAuth()

  return (
    <Box flex={1} bg="gray.900">
      <NavigationContainer>{user.name ? <AppRoutes /> : <AuthScreen />}</NavigationContainer>
    </Box>
  )
}
