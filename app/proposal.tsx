import { useReducer, useEffect, useRef } from 'react'
import { StyleSheet, View, Animated as RNAnimated } from 'react-native'
import { Text } from 'tamagui'
import { PomImage, PomMood } from '../components/PomImage'
import { SpeechBubble } from '../components/SpeechBubble'
import { NoButton } from '../components/NoButton'
import { YesButton } from '../components/YesButton'
import { FailCounter } from '../components/FailCounter'
import { Confetti } from '../components/Confetti'
import { SPEECH_LINES } from '../constants/lines'

type Phase = 'asking' | 'dodging' | 'desperate' | 'victory'

interface State {
  phase: Phase
  failCount: number
}

type Action = { type: 'NO_ATTEMPT' } | { type: 'YES_PRESSED' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'NO_ATTEMPT': {
      const newCount = state.failCount + 1
      let phase: Phase = 'dodging'
      if (newCount >= 5) phase = 'desperate'
      return { phase, failCount: newCount }
    }
    case 'YES_PRESSED':
      return { ...state, phase: 'victory' }
    default:
      return state
  }
}

function getPomMood(state: State): PomMood {
  switch (state.phase) {
    case 'asking':
      return 'hopeful'
    case 'dodging':
      return 'sad'
    case 'desperate':
      return 'dramatic'
    case 'victory':
      return 'happy'
  }
}

function FadeInView({ delay = 0, children }: { delay?: number; children: React.ReactNode }) {
  const opacity = useRef(new RNAnimated.Value(0)).current
  const translateY = useRef(new RNAnimated.Value(20)).current

  useEffect(() => {
    const timer = setTimeout(() => {
      RNAnimated.parallel([
        RNAnimated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        RNAnimated.spring(translateY, {
          toValue: 0,
          damping: 12,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]).start()
    }, delay)
    return () => clearTimeout(timer)
  }, [])

  return (
    <RNAnimated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </RNAnimated.View>
  )
}

export default function ProposalScreen() {
  const [state, dispatch] = useReducer(reducer, {
    phase: 'asking',
    failCount: 0,
  })

  const mood = getPomMood(state)
  const speechLine =
    state.failCount > 0
      ? SPEECH_LINES[Math.min(state.failCount - 1, SPEECH_LINES.length - 1)]
      : ''

  if (state.phase === 'victory') {
    return (
      <View style={styles.container}>
        <Confetti />
        <View style={styles.victoryContent}>
          <FadeInView>
            <PomImage mood="happy" size={220} />
          </FadeInView>

          <FadeInView delay={400}>
            <Text
              fontSize={32}
              fontWeight="800"
              color="#E11D48"
              textAlign="center"
              marginTop={24}
            >
              YAY! 🎉
            </Text>
          </FadeInView>

          <FadeInView delay={800}>
            <Text
              fontSize={18}
              color="#881337"
              textAlign="center"
              marginTop={16}
              paddingHorizontal={32}
              lineHeight={26}
            >
              I knew you'd say yes!{'\n'}
              Happy Valentine's Day Amna! 💕 {'\n'}
              I love you so much!
            </Text>
          </FadeInView>

          <FadeInView delay={1200}>
            <Text
              fontSize={14}
              color="#FB7185"
              textAlign="center"
              marginTop={24}
              fontStyle="italic"
            >
              — Azhar 🐾
            </Text>
          </FadeInView>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Pom Image */}
        <FadeInView>
          <View style={styles.pomContainer}>
            <PomImage mood={mood} />
          </View>
        </FadeInView>

        {/* Speech Bubble (from the Pom) */}
        <View style={styles.speechContainer}>
          <SpeechBubble text={speechLine} visible={state.failCount > 0} />
        </View>

        {/* Question */}
        <FadeInView delay={200}>
          <Text
            fontSize={28}
            fontWeight="800"
            color="#E11D48"
            textAlign="center"
            marginTop={state.failCount > 0 ? 8 : 20}
          >
            Will you be my Valentine Amna?
          </Text>
        </FadeInView>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <YesButton
            failCount={state.failCount}
            onPress={() => dispatch({ type: 'YES_PRESSED' })}
          />
          <NoButton
            failCount={state.failCount}
            onAttempt={() => dispatch({ type: 'NO_ATTEMPT' })}
          />
        </View>

        {/* Fail Counter */}
        <View style={styles.counterContainer}>
          <FailCounter count={state.failCount} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F3',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  victoryContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  pomContainer: {
    borderRadius: 999,
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  speechContainer: {
    minHeight: 0,
    justifyContent: 'center',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 16,
  },
  counterContainer: {
    marginTop: 16,
  },
})
