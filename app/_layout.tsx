import { Stack } from 'expo-router'
import { TamaguiProvider } from 'tamagui'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import config from '../tamagui.config'

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config} defaultTheme="valentine">
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFF0F3' },
            animation: 'fade',
          }}
        />
      </TamaguiProvider>
    </GestureHandlerRootView>
  )
}
