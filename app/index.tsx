import { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Animated as RNAnimated } from 'react-native'
import { useRouter } from 'expo-router'
import { Text } from 'tamagui'
import { LOADING_MESSAGES } from '../constants/lines'

export default function LoadingScreen() {
  const router = useRouter()
  const [messageIndex, setMessageIndex] = useState(0)
  const progressAnim = useRef(new RNAnimated.Value(0)).current
  const pomScale = useRef(new RNAnimated.Value(1)).current
  const messageOpacity = useRef(new RNAnimated.Value(1)).current

  useEffect(() => {
    // Pom bounce
    RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(pomScale, {
          toValue: 1.08,
          duration: 600,
          useNativeDriver: true,
        }),
        RNAnimated.timing(pomScale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start()

    // Progress bar
    RNAnimated.timing(progressAnim, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start()

    // Cycle messages
    const messageInterval = setInterval(() => {
      RNAnimated.timing(messageOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setMessageIndex((prev) => {
          if (prev >= LOADING_MESSAGES.length - 1) return prev
          return prev + 1
        })
        RNAnimated.timing(messageOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }).start()
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

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  })

  return (
    <View style={styles.container}>
      <RNAnimated.View style={{ transform: [{ scale: pomScale }] }}>
        <Text fontSize={80} textAlign="center">
          🐕
        </Text>
      </RNAnimated.View>

      <View style={styles.messageContainer}>
        <RNAnimated.View style={{ opacity: messageOpacity }}>
          <Text
            fontSize={18}
            fontWeight="600"
            color="#881337"
            textAlign="center"
          >
            {LOADING_MESSAGES[messageIndex]}
          </Text>
        </RNAnimated.View>
      </View>

      <View style={styles.progressContainer}>
        <RNAnimated.View style={[styles.progressBar, { width: progressWidth }]} />
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
