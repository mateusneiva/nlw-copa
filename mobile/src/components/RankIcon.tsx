import { Center, Text } from 'native-base'

interface Props {
  rankNumber: number
}

export function RankIcon({ rankNumber }: Props) {
  return (
    <Center w={12} h={7} borderRadius="full" bgColor="yellow.500">
      <Text fontSize="sm" fontFamily="heading" textTransform="uppercase" color="black">{`${rankNumber}°`}</Text>
    </Center>
  )
}
