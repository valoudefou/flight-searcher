import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { FlagshipProvider } from '@flagship.io/react-native-sdk';
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Wait until fonts are loaded
  }
  console.log('test');
  return (
    <FlagshipProvider
    envId="cimqt0uqvn36gba8e4b0"
    apiKey="fzGFlVlcAWBjKJAAAXcPfSQcAHHQkqJekDprRisp"
    visitorData={{
      id: ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ Math.random() * 16 >> c / 4).toString(16)), // Leave the field blank with '', and AB Tasty will generate a persistent ID for the user automatically
      hasConsented: true, // This is required
      context: {
        user: "returning"
      },
    }}
    >
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </FlagshipProvider>
  );
}
