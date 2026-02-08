import { useCallback } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import * as Haptics from 'expo-haptics'

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window')
const BUTTON_W = 120
const BUTTON_H = 50
const PADDING = 20

interface NoButtonProps {
  failCount: number
  onAttempt: () => void
}

export function NoButton({ failCount, onAttempt }: NoButtonProps) {
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const maxAttempts = 9
  const scale = Math.max(1 - failCount * 0.12, 0.2)
  const opacity = failCount >= maxAttempts ? 0 : Math.max(1 - failCount * 0.08, 0.3)

  const dodge = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    onAttempt()

    const angle = Math.random() * Math.PI * 2
    const distance = 120 + Math.random() * 100

    let newX = translateX.value + Math.cos(angle) * distance
    let newY = translateY.value + Math.sin(angle) * distance

    // Clamp to screen bounds
    const halfW = (BUTTON_W * scale) / 2
    const halfH = (BUTTON_H * scale) / 2
    const centerX = SCREEN_W / 2
    const centerY = SCREEN_H * 0.7 // buttons are in bottom portion

    const minX = -(centerX - halfW - PADDING)
    const maxX = centerX - halfW - PADDING
    const minY = -150
    const maxY = 150

    newX = Math.max(minX, Math.min(maxX, newX))
    newY = Math.max(minY, Math.min(maxY, newY))

    translateX.value = withSpring(newX, {
      damping: 8,
      stiffness: 150,
      mass: 0.5,
    })
    translateY.value = withSpring(newY, {
      damping: 8,
      stiffness: 150,
      mass: 0.5,
    })
  }, [failCount, onAttempt, scale])

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(dodge)()
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withTiming(scale, { duration: 300 }) },
    ],
    opacity: withTiming(opacity, { duration: 300 }),
  }))

  if (failCount >= maxAttempts) return null

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <Animated.Text style={styles.text}>No</Animated.Text>
      </Animated.View>
    </GestureDetector>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9CA3AF',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 30,
    minWidth: BUTTON_W,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
})
