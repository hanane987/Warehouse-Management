
import { Stack } from 'expo-router';
import ProductList from './(tabs)/ProductList'; 

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      

    </Stack>
  );
}