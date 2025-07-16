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
    { name: "/notification", label: "Notification", icon: "bell" },
    { name: "/profile", label: "Profile", icon: "user" },
] as const;

export default function CustomTabBar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <View style={tw`flex-row bg-[${COLORS.primary}]  py-[18px] justify-around items-center `}>
            {tabs.map((tab) => {
                const isActive =
                    pathname === tab.name ||
                    (tab.name === "/" && pathname === "/");

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => router.push(tab.name as any)}
                        style={tw`items-center justify-center`}
                    >
                        <Feather
                            name={tab.icon as any}
                            size={24}
                            color={isActive ? COLORS.white : COLORS.gray}
                        />
                        {isActive && (
                            <Text style={tw`text-xs text-white font-bold mt-1`}>
                                {tab.label}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}