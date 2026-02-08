import { StyleSheet, View, Text } from 'react-native'

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🐕</Text>
      <Text style={styles.text}>Loading very important question...</Text>
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
  emoji: {
    fontSize: 80,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#881337',
    marginTop: 24,
  },
})
