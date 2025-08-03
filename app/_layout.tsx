import tw from "@/assets/lib/tailwind";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <SafeAreaView style={[tw`flex-1`, {
      paddingTop: top,
      paddingBottom: bottom,
      backgroundColor: '#151515'
    }]} >
      <StatusBar backgroundColor="#151515" barStyle={'light-content'} />
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          animation: 'default',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboardscreens)/firstonboardScreen" />
        {/* <Stack.Screen name="(tabs)" /> */}
      </Stack>
    </SafeAreaView>
  );
}