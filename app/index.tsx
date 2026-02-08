import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import { Text } from 'tamagui'
import { LOADING_MESSAGES } from '../constants/lines'

export default function LoadingScreen() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const progress = useSharedValue(0)
  const pomScale = useSharedValue(1)

  useEffect(() => {
    // Pom bounce animation
    pomScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    )

    // Progress bar
    progress.value = withTiming(1, {
      duration: 4000,
      easing: Easing.inOut(Easing.ease),
    })

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= LOADING_MESSAGES.length - 1) return prev
        return prev + 1
      })
    }, 800)

    // Navigate after loading
    const timer = setTimeout(() => {
      router.replace('/proposal')
    }, 4200)

    return () => {
      clearInterval(messageInterval)
      clearTimeout(timer)
    }
  }, [])

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%` as any,
  }))

  const pomStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pomScale.value }],
  }))

  return (
    <View style={styles.container}>
      <Animated.View style={pomStyle}>
        <Text fontSize={80} textAlign="center">
          🐕
        </Text>
      </Animated.View>

      <View style={styles.messageContainer}>
        <Animated.View key={messageIndex} entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)}>
          <Text
            fontSize={18}
            fontWeight="600"
            color="#881337"
            textAlign="center"
          >
            {LOADING_MESSAGES[messageIndex]}
          </Text>
        </Animated.View>
      </View>

      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, progressStyle]} />
      </View>

      <Text fontSize={12} color="#FB7185" marginTop={12}>
        Please wait... this is very important
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  messageContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  progressContainer: {
    width: '80%',
    height: 8,
    backgroundColor: '#FCE7F3',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E11D48',
    borderRadius: 4,
  },
})
