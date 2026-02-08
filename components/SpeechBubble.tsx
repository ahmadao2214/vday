import { StyleSheet, View } from 'react-native'
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated'
import { Text } from 'tamagui'

interface SpeechBubbleProps {
  text: string
  visible: boolean
}

export function SpeechBubble({ text, visible }: SpeechBubbleProps) {
  if (!visible) return null

  return (
    <Animated.View
      entering={SlideInDown.springify().damping(12)}
      style={styles.container}
    >
      <View style={styles.bubble}>
        <Text
          fontSize={16}
          fontWeight="600"
          color="#881337"
          textAlign="center"
        >
          {text}
        </Text>
      </View>
      <View style={styles.tail} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 8,
  },
  bubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#FDA4AF',
    maxWidth: 260,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tail: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#FDA4AF',
    marginTop: -1,
  },
})
