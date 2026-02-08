import { useReducer } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, { FadeIn, FadeInUp, SlideInUp } from 'react-native-reanimated'
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
        <Animated.View entering={FadeIn.duration(800)} style={styles.victoryContent}>
          <PomImage mood="happy" size={220} />

          <Animated.View entering={FadeInUp.delay(400).duration(600)}>
            <Text
              fontSize={32}
              fontWeight="800"
              color="#E11D48"
              textAlign="center"
              marginTop={24}
            >
              YAY! 🎉
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800).duration(600)}>
            <Text
              fontSize={18}
              color="#881337"
              textAlign="center"
              marginTop={16}
              paddingHorizontal={32}
              lineHeight={26}
            >
              I knew you'd say yes!{'\n'}
              Happy Valentine's Day! 💕
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(1200).duration(600)}>
            <Text
              fontSize={14}
              color="#FB7185"
              textAlign="center"
              marginTop={24}
              fontStyle="italic"
            >
              — Your favorite Pom 🐾
            </Text>
          </Animated.View>
        </Animated.View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
        {/* Pom Image */}
        <View style={styles.pomContainer}>
          <PomImage mood={mood} />
        </View>

        {/* Question */}
        <Animated.View entering={SlideInUp.delay(200).springify()}>
          <Text
            fontSize={28}
            fontWeight="800"
            color="#E11D48"
            textAlign="center"
            marginTop={20}
          >
            Will you be my Valentine?
          </Text>
        </Animated.View>

        {/* Speech Bubble */}
        <View style={styles.speechContainer}>
          <SpeechBubble text={speechLine} visible={state.failCount > 0} />
        </View>

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
      </Animated.View>
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
    shadowColor: '#E11D48',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  speechContainer: {
    height: 80,
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 16,
  },
  counterContainer: {
    marginTop: 24,
  },
})
