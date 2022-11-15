import { useState, useEffect } from 'react'
import { FlatList, useToast } from 'native-base'

import { API } from '../services/API'

import { Game, GameProps } from './Game'
import { Loading } from './UI'

interface Props {
  pollId: string
}

export function Guesses({ pollId }: Props) {
  const [gamesData, setGamesData] = useState<GameProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [firstTeamPoints, setFirstTeamPoints] = useState('')
  const [secondTeamPoints, setSecondTeamPoints] = useState('')

  const toast = useToast()

  async function fetchGames() {
    try {
      setIsLoading(true)

      const gamesResponse = await API.get(`/polls/${pollId}/games`)

      setGamesData(gamesResponse.data.games)
    } catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível carregar os jogos.',
        placement: 'top',
        color: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Informe o placar do palpite.',
          placement: 'top',
          bgColor: 'red.500',
        })
      }

      setIsLoading(true)

      await API.post(`/polls/${pollId}/games/${gameId}/guess`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      })

      toast.show({
        title: 'Palpite Realizado com sucesso.',
        placement: 'top',
        bgColor: 'green.500',
      })

      fetchGames()
    } catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possível enviar o palpite.',
        placement: 'top',
        bgColor: 'red.500',
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [pollId])

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList data={gamesData} keyExtractor={(item) => item.id} renderItem={({ item }) => <Game data={item} setFirstTeamPoints={setFirstTeamPoints} setSecondTeamPoints={setSecondTeamPoints} onGuessConfirm={() => handleGuessConfirm(item.id)} />} />
  )
}
