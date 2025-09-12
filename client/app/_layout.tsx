import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DoctorContextProvider from '@/context/DoctorContext/DoctorContextProvider';

export default function RootLayout() {
  useFrameworkReady();
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboardingStatus();
    checkAuthStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const completed = await AsyncStorage.getItem('onboardingCompleted');
      setIsOnboardingCompleted(completed === 'true');
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsOnboardingCompleted(false);
    }
  };

  const checkAuthStatus = async () => {
    try {
      const loggedIn = await AsyncStorage.getItem('isLoggedIn');
      const isGuest = await AsyncStorage.getItem('isGuest');
      setIsLoggedIn(loggedIn === 'true' || isGuest === 'true');
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsLoggedIn(false);
    }
  };

  if (isOnboardingCompleted === null || isLoggedIn === null) {
    // Show loading or splash screen
    return null;
  }

  // Determine initial route
  let initialRoute = "onboarding";
  if (isOnboardingCompleted && isLoggedIn) {
    initialRoute = "(tabs)";
  } else if (isOnboardingCompleted && !isLoggedIn) {
    initialRoute = "auth/login";
  }

  return (
    <>
      <DoctorContextProvider>
        <Stack
          screenOptions={{ headerShown: false }}
          initialRouteName={initialRoute}
        >
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="auth/register" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="booking/[doctorId]" />
          <Stack.Screen name="symptom-checker" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </DoctorContextProvider>
    </>
  );
}