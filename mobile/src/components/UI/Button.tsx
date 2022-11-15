import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base'

interface Props extends IButtonProps {
  title: string
  type?: 'PRIMARY' | 'SECONDARY'
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={14}
      rounded="sm"
      fontSize="sm"
      bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bg: type === 'SECONDARY' ? 'red.400' : 'yellow.600',
      }}
      _loading={{
        _spinner: {
          size: 26,
        },
      }}
      {...rest}
    >
      <Text fontSize="sm" fontFamily="heading" textTransform="uppercase" color={type === 'SECONDARY' ? 'white' : 'black'} ml="1">
        {title}
      </Text>
    </ButtonNativeBase>
  )
}
