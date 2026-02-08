import { useCallback, useRef } from 'react'
import { Dimensions, Pressable, StyleSheet, Animated as RNAnimated } from 'react-native'
import * as Haptics from 'expo-haptics'

const { width: SCREEN_W } = Dimensions.get('window')
const BUTTON_W = 120
const PADDING = 20

interface NoButtonProps {
  failCount: number
  onAttempt: () => void
}

export function NoButton({ failCount, onAttempt }: NoButtonProps) {
  const translateX = useRef(new RNAnimated.Value(0)).current
  const translateY = useRef(new RNAnimated.Value(0)).current
  const currentX = useRef(0)
  const currentY = useRef(0)

  const maxAttempts = 9
  const scale = Math.max(1 - failCount * 0.12, 0.2)
  const opacity = failCount >= maxAttempts ? 0 : Math.max(1 - failCount * 0.08, 0.3)

  const dodge = useCallback(() => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } catch {}
    onAttempt()

    const angle = Math.random() * Math.PI * 2
    const distance = 120 + Math.random() * 100

    let newX = currentX.current + Math.cos(angle) * distance
    let newY = currentY.current + Math.sin(angle) * distance

    const halfW = (BUTTON_W * scale) / 2
    const centerX = SCREEN_W / 2

    const minX = -(centerX - halfW - PADDING)
    const maxX = centerX - halfW - PADDING
    const minY = -150
    const maxY = 150

    newX = Math.max(minX, Math.min(maxX, newX))
    newY = Math.max(minY, Math.min(maxY, newY))

    currentX.current = newX
    currentY.current = newY

    RNAnimated.spring(translateX, {
      toValue: newX,
      damping: 8,
      stiffness: 150,
      mass: 0.5,
      useNativeDriver: true,
    }).start()

    RNAnimated.spring(translateY, {
      toValue: newY,
      damping: 8,
      stiffness: 150,
      mass: 0.5,
      useNativeDriver: true,
    }).start()
  }, [failCount, onAttempt, scale])

  if (failCount >= maxAttempts) return null

  return (
    <RNAnimated.View
      style={[
        styles.button,
        {
          opacity,
          transform: [
            { translateX },
            { translateY },
            { scale },
          ],
        },
      ]}
    >
      <Pressable onPress={dodge} style={styles.pressable}>
        <RNAnimated.Text style={styles.text}>No</RNAnimated.Text>
      </Pressable>
    </RNAnimated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#9CA3AF',
    borderRadius: 30,
    minWidth: BUTTON_W,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  pressable: {
    paddingHorizontal: 36,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
})
