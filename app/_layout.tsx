import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BookingProvider } from '../src/booking';

export default function RootLayout() {
  return (
    <BookingProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
    </BookingProvider>
  );
}
