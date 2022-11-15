import { Center, Text, Icon } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import { useAuth } from '../hooks/useAuth'

import { Button } from '../components/UI'

import Logo from '../assets/logo.svg'

export function AuthScreen() {
  const { signIn, isUserLoading } = useAuth()

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={250} height={50} />
      <Button title="Entrar com Google" leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />} type="SECONDARY" mt={12} onPress={signIn} isLoading={isUserLoading} />

      <Text color="gray.200" textAlign="center" fontSize={15} lineHeight={25} mt={6}>
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para a criação de conta.
      </Text>
    </Center>
  )
}
