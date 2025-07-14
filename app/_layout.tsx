import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>

      <StatusBar barStyle={'light-content'} />
      <Stack initialRouteName="(splash)/splashscreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(splash)/splashscreen" />
        <Stack.Screen name="(tabs)/home" />
      </Stack>
    </>
  );
}
