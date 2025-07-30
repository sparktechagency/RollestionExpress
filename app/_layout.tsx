import tw from "@/assets/lib/tailwind";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";

export default function RootLayout() {
  // const { bottom, top } = useSafeAreaInsets()
  return (
    <SafeAreaView style={[tw`flex-1`]} >
      <StatusBar barStyle={'light-content'} />
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