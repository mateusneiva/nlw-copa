import { useState, useEffect } from 'react'
import { Share } from 'react-native'
import { HStack, useToast, VStack } from 'native-base'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Loading, Header, Option } from '../components/UI'

import { PollCardProps } from '../components/PollCard'
import { PollHeader } from '../components/PollHeader'
import { Guesses } from '../components/Guesses'
import { Ranking } from '../components/Ranking'

import { API } from '../services/API'

interface RouteParams {
  id: string
}

export function PollDetailsScreen() {
  const [pollData, setPollData] = useState<PollCardProps>({} as PollCardProps)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [optionSelected, setOptionSelected] = useState<'GUESSES' | 'RANKING'>('GUESSES')

  const toast = useToast()
  const navigation = useNavigation()
  const route = useRoute()

  const { id } = route.params as RouteParams

  async function fetchPollData() {
    try {
      setIsLoading(true)

      const getPollResponse = await API.get(`/polls/${id}`)

      setPollData(getPollResponse.data)
      setIsLoading(false)
    } catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível acessar este bolão. Tente novamente.',
        placement: 'top',
        bgColor: 'red.500',
      })

      navigation.goBack()
    }
  }

  async function handleCodeShare() {
    await Share.share({
      title: 'Use o código e entre no meu bolão! 🤠',
      message: pollData.code,
    })
  }

  useEffect(() => {
    fetchPollData()
  }, [id])

  if (isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title={pollData.title} showBackButton showShareButton onShare={handleCodeShare} />

      {/* {pollData._count?.participants > 0 ? ( */}
      <VStack flex={1} px={5}>
        <PollHeader data={pollData} />

        <HStack bg="gray.800" p={1} rounded="sm" mb={5}>
          <Option title="Seus Palpites" isSelected={optionSelected === 'GUESSES'} onPress={() => setOptionSelected('GUESSES')} />
          <Option title="Ranking do Grupo" isSelected={optionSelected === 'RANKING'} onPress={() => setOptionSelected('RANKING')} />
        </HStack>

        {optionSelected === 'GUESSES' && <Guesses pollId={pollData.id} />}
        {optionSelected === 'RANKING' && <Ranking pollId={pollData.id} />}
      </VStack>

      {/* ) : (
        <EmptyMyPollList code={pollData.code} />
      )} */}
    </VStack>
  )
}
