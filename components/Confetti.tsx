import { useEffect } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated'

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window')

const HEARTS = ['💕', '❤️', '💖', '💗', '🩷', '🐾', '✨', '💝']
const NUM_PARTICLES = 30

interface ParticleProps {
  emoji: string
  delay: number
  startX: number
  duration: number
  size: number
  endRotation: number
}

function Particle({ emoji, delay, startX, duration, size, endRotation }: ParticleProps) {
  const translateY = useSharedValue(-60)
  const opacity = useSharedValue(0)
  const rotate = useSharedValue(0)

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 200 }))
    translateY.value = withDelay(
      delay,
      withTiming(SCREEN_H + 60, {
        duration,
        easing: Easing.linear,
      })
    )
    rotate.value = withDelay(
      delay,
      withTiming(endRotation, {
        duration,
        easing: Easing.linear,
      })
    )

    // Fade out near the end
    const fadeDelay = delay + duration * 0.7
    opacity.value = withDelay(delay, withTiming(1, { duration: 200 }, () => {
      opacity.value = withDelay(duration * 0.6, withTiming(0, { duration: duration * 0.3 }))
    }))
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }))

  return (
    <Animated.Text
      style={[
        {
          position: 'absolute',
          left: startX,
          top: 0,
          fontSize: size,
        },
        animatedStyle,
      ]}
    >
      {emoji}
    </Animated.Text>
  )
}

export function Confetti() {
  const particles = Array.from({ length: NUM_PARTICLES }, (_, i) => ({
    id: i,
    emoji: HEARTS[i % HEARTS.length],
    delay: Math.random() * 2000,
    startX: Math.random() * SCREEN_W,
    duration: 3000 + Math.random() * 3000,
    size: 16 + Math.random() * 20,
    endRotation: (Math.random() - 0.5) * 720,
  }))

  return (
    <Animated.View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </Animated.View>
  )
}
