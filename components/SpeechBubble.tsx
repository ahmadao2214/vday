import { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated as RNAnimated } from 'react-native'
import { Text } from 'tamagui'

interface SpeechBubbleProps {
  text: string
  visible: boolean
}

export function SpeechBubble({ text, visible }: SpeechBubbleProps) {
  const scaleAnim = useRef(new RNAnimated.Value(0)).current
  const opacityAnim = useRef(new RNAnimated.Value(0)).current

  useEffect(() => {
    if (visible) {
      RNAnimated.parallel([
        RNAnimated.spring(scaleAnim, {
          toValue: 1,
          damping: 12,
          stiffness: 200,
          useNativeDriver: true,
        }),
        RNAnimated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible, text])

  if (!visible) return null

  return (
    <RNAnimated.View
      style={[
        styles.container,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.tailUp} />
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
    </RNAnimated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 4,
  },
  tailUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FDA4AF',
    marginBottom: -1,
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
})
