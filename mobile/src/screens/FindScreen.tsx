import { useState } from 'react'
import { Heading, useToast, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { Header, Input, Button } from '../components/UI'

import { API } from '../services/API'

export function FindScreen() {
  const [codeValue, setCodeValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const toast = useToast()
  const navigation = useNavigation()

  async function handleJoinPoll() {
    try {
      if (!codeValue.trim()) {
        return toast.show({
          title: 'Informe o código do bolão!',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      setIsLoading(true)

      await API.post('/polls/join', { code: codeValue.toUpperCase() })

      toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      })

      navigation.navigate('polls')
    } catch (err) {
      console.log(err)
      setIsLoading(false)

      if (err.response?.data?.message === 'Poll not found.') {
        return toast.show({
          title: 'Não foi possível encontrar o bolão. Verifique o código e tente novamente.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      if (err.response?.data?.message === 'You already joined this poll.') {
        return toast.show({
          title: 'Você já está nesse bolão! Verifique a sua lista de bolões.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      toast.show({
        title: 'Não foi possível entrar nesse bolão. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500',
      })
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={8} mx={5} alignItems="center">
        <Heading fontFamily="heading" color="white" fontSize="xl" my={8} textAlign="center">
          Encontre um bolão através de seu código único
        </Heading>

        <Input mb={2} placeholder="Qual o código do bolão?" onChangeText={setCodeValue} value={codeValue} />
        <Button title="Buscar bolão" isLoading={isLoading} onPress={handleJoinPoll} />
      </VStack>
    </VStack>
  )
}
