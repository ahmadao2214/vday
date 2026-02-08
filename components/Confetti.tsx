import { useEffect, useRef, useMemo } from 'react'
import { Dimensions, StyleSheet, Animated as RNAnimated, View } from 'react-native'

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
  const translateY = useRef(new RNAnimated.Value(-60)).current
  const opacity = useRef(new RNAnimated.Value(0)).current
  const rotate = useRef(new RNAnimated.Value(0)).current

  useEffect(() => {
    const timer = setTimeout(() => {
      RNAnimated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start()

      RNAnimated.timing(translateY, {
        toValue: SCREEN_H + 60,
        duration,
        useNativeDriver: true,
      }).start()

      RNAnimated.timing(rotate, {
        toValue: endRotation,
        duration,
        useNativeDriver: true,
      }).start()

      // Fade out
      setTimeout(() => {
        RNAnimated.timing(opacity, {
          toValue: 0,
          duration: duration * 0.3,
          useNativeDriver: true,
        }).start()
      }, duration * 0.6)
    }, delay)

    return () => clearTimeout(timer)
  }, [])

  const rotateStr = rotate.interpolate({
    inputRange: [-720, 720],
    outputRange: ['-720deg', '720deg'],
  })

  return (
    <RNAnimated.Text
      style={{
        position: 'absolute',
        left: startX,
        top: 0,
        fontSize: size,
        opacity,
        transform: [
          { translateY },
          { rotate: rotateStr },
        ],
      }}
    >
      {emoji}
    </RNAnimated.Text>
  )
}

export function Confetti() {
  const particles = useMemo(
    () =>
      Array.from({ length: NUM_PARTICLES }, (_, i) => ({
        id: i,
        emoji: HEARTS[i % HEARTS.length],
        delay: Math.random() * 2000,
        startX: Math.random() * SCREEN_W,
        duration: 3000 + Math.random() * 3000,
        size: 16 + Math.random() * 20,
        endRotation: (Math.random() - 0.5) * 720,
      })),
    []
  )

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}
    </View>
  )
}
