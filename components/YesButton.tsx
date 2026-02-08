import { useEffect, useRef } from 'react'
import { Pressable, StyleSheet, Animated as RNAnimated } from 'react-native'
import * as Haptics from 'expo-haptics'

interface YesButtonProps {
  failCount: number
  onPress: () => void
}

export function YesButton({ failCount, onPress }: YesButtonProps) {
  const scaleAnim = useRef(new RNAnimated.Value(1)).current
  const targetScale = Math.min(1 + failCount * 0.08, 1.8)

  useEffect(() => {
    RNAnimated.spring(scaleAnim, {
      toValue: targetScale,
      damping: 12,
      stiffness: 100,
      useNativeDriver: true,
    }).start()
  }, [targetScale])

  const handlePress = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch {}
    onPress()
  }

  return (
    <RNAnimated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <RNAnimated.Text style={styles.text}>Yes! 💕</RNAnimated.Text>
      </Pressable>
    </RNAnimated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E11D48',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 30,
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  pressed: {
    backgroundColor: '#BE123C',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
})
