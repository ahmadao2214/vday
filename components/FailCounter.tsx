import { StyleSheet, View } from 'react-native'
import { Text } from 'tamagui'

interface FailCounterProps {
  count: number
}

export function FailCounter({ count }: FailCounterProps) {
  if (count === 0) return null

  return (
    <View style={styles.container}>
      <Text fontSize={13} color="#FB7185" fontWeight="500">
        Times tried to say No: {count} | Times succeeded: 0
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
})
