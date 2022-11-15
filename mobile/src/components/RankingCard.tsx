import { TouchableOpacity } from 'react-native'
import { Heading, HStack, Text, VStack, Avatar } from 'native-base'
import { RankIcon } from './RankIcon'

export interface RankingCardProps {
  id?: string
  avatarUrl: string
  name: string
}

export function RankingCard({ name, avatarUrl }: RankingCardProps) {
  return (
    <TouchableOpacity>
      <HStack w="full" h={22} bgColor="gray.800" borderBottomWidth={3} borderBottomColor="yellow.500" justifyContent="space-between" alignItems="center" rounded="sm" mb={3} p={4}>
        <HStack>
          <Avatar source={{ uri: avatarUrl }} w={10} h={10} rounded="full" mr={3} />
          <VStack>
            <Heading color="white" fontSize="md" fontFamily="heading">
              {name}
            </Heading>

            <Text color="gray.200" fontSize="xs">
              0 ponto(s)
            </Text>
          </VStack>
        </HStack>
        <RankIcon rankNumber={1} />
      </HStack>
    </TouchableOpacity>
  )
}
