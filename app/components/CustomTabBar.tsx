import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import tw from 'twrnc';
import COLORS from "../constants/color";

const tabs = [
    { name: "/", label: "Home", icon: "home" },
    { name: "/wallet", label: "Wallet", icon: "credit-card" },
    { name: "/routes", label: "Routes", icon: "map" },
    { name: "/notification", label: "Alerts", icon: "bell" },
    { name: "/profile", label: "Profile", icon: "user" },
] as const;

export default function CustomTabBar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={tw`flex-row bg-[${COLORS.primary}] py-1 justify-around items-center`}>
            {tabs.map((tab) => {
                // Simplified this logic for clarity
                const isActive = pathname === tab.name;

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => router.push(tab.name as any)}
                        // Added `flex-1` here to expand the touchable area
                        style={tw`flex-1 items-center justify-center py-2 `}
                    >
                        <Feather
                            name={tab.icon as any}
                            size={24}
                            color={isActive ? COLORS.white : COLORS.gray}
                        />
                        <Text style={tw`text-xs  py-[10px] ${isActive ? 'text-white' : 'text-gray-400 text-[8px]'} font-bold mt-1`}>
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}