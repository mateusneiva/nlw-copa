import { useState, useEffect } from 'react'
import { useToast, FlatList } from 'native-base'

import { Loading } from './UI'
import { RankingCard, RankingCardProps } from './RankingCard'
import { API } from '../services/API'

interface Props {
  pollId: string
}

export function Ranking({ pollId }: Props) {
  const [rankingData, setRankingData] = useState<RankingCardProps[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  async function fetchRankingData() {
    try {
      setIsLoading(true)

      const rankingResponse = await API.get(`/polls/${pollId}/ranking`)

      setRankingData(rankingResponse.data)
    } catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível obter o Ranking. Tente Novamente.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRankingData()
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return <FlatList data={rankingData} keyExtractor={(item) => item.id} renderItem={({ item }) => <RankingCard name={item.name} avatarUrl={item.avatarUrl} />} />
}
