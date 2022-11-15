import { useState } from 'react'
import { Heading, Text, VStack, useToast } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Button, Input } from '../components/UI'

import { API } from '../services/API'

import Logo from '../assets/logo.svg'

export function CreateScreen() {
  const [titleValue, setTitleValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigation = useNavigation()
  const toast = useToast()

  async function handleCreatePoll() {
    if (!titleValue.trim()) {
      return toast.show({
        title: 'Informe um nome para o seu bolão.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }

    try {
      setIsLoading(true)

      await API.post('/polls/create', {
        title: titleValue,
      })

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigation.navigate('polls')
    } catch (err) {
      console.log(err)
      setIsLoading(false)

      toast.show({
        title: 'Não foi possível criar o bolão. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      {/* <Header title="Criar novo bolão" /> */}

      <VStack flex={1} justifyContent="center" mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Crie seu próprio bolão da copa e compartilhe com amigos!
        </Heading>

        <Input mb={2} placeholder="Qual o nome do seu bolão?" onChangeText={setTitleValue} value={titleValue} />
        <Button title="Criar o meu bolão" onPress={handleCreatePoll} isLoading={isLoading} />

        <Text color="gray.200" fontSize="sm" textAlign="center" px="10" mt={4}>
          Após criar seu bolão, você receberá um código único que podéra usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  )
}
