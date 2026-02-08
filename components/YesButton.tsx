import { Pressable, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

interface YesButtonProps {
  failCount: number
  onPress: () => void
}

export function YesButton({ failCount, onPress }: YesButtonProps) {
  // Grows as fail count increases
  const targetScale = Math.min(1 + failCount * 0.08, 1.8)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withSpring(targetScale, {
          damping: 12,
          stiffness: 100,
        }),
      },
    ],
  }))

  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    onPress()
  }

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.pressed,
        ]}
      >
        <Animated.Text style={styles.text}>Yes! 💕</Animated.Text>
      </Pressable>
    </Animated.View>
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
    transform: [{ scale: 0.95 }],
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
})
