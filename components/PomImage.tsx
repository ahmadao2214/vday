import { useEffect, useRef } from 'react'
import { Image, ImageSourcePropType, Animated as RNAnimated } from 'react-native'

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
  const opacity = useRef(new RNAnimated.Value(1)).current

  useEffect(() => {
    opacity.setValue(0)
    RNAnimated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start()
  }, [mood])

  return (
    <RNAnimated.View style={{ opacity }}>
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
    </RNAnimated.View>
  )
}
