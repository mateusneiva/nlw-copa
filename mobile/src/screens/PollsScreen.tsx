import { useState, useCallback } from 'react'
import { Icon, useToast, VStack, FlatList } from 'native-base'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { Octicons } from '@expo/vector-icons'

import { Button, Loading, Header } from '../components/UI'

import { PollCard, PollCardProps } from '../components/PollCard'
import { EmptyPollList } from '../components/EmptyPollList'

import { API } from '../services/API'

export function PollsScreen() {
  const [pollsData, setPollsData] = useState<PollCardProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()
  const toast = useToast()

  async function fetchPolls() {
    try {
      setIsLoading(true)
      const polls = await API.get('/polls')

      setPollsData(polls.data.polls)
    } catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível obter os bolões.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPolls()
    }, [])
  )

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button title="Buscar bolão por código" leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />} onPress={() => navigation.navigate('find')} />
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={pollsData}
          keyExtractor={(item) => item.id}
          px={5}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => <EmptyPollList />}
          renderItem={({ item }) => <PollCard data={item} onPress={() => navigation.navigate('details', { id: item.id })} />}
        />
      )}
    </VStack>
  )
}
