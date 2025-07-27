import tw from "@/assets/lib/tailwind";
import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const { bottom, top } = useSafeAreaInsets()
  return (
    <SafeAreaView style={[tw`flex-1`, {
      paddingBottom: bottom,
      paddingTop: top
    }]} >
      <StatusBar barStyle={'dark-content'} />
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