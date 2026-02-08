import { Image, ImageSourcePropType } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

export type PomMood = 'hopeful' | 'sad' | 'dramatic' | 'happy'

const POM_IMAGES: Record<PomMood, ImageSourcePropType> = {
  hopeful: require('../assets/pom/hopeful.png'),
  sad: require('../assets/pom/sad.png'),
  dramatic: require('../assets/pom/dramatic.png'),
  happy: require('../assets/pom/happy.png'),
}

interface PomImageProps {
  mood: PomMood
  size?: number
}

export function PomImage({ mood, size = 250 }: PomImageProps) {
  return (
    <Animated.View
      key={mood}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(200)}
    >
      <Image
        source={POM_IMAGES[mood]}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 4,
          borderColor: '#FDA4AF',
        }}
        resizeMode="cover"
      />
    </Animated.View>
  )
}
