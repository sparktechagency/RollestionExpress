import { Feather } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        <View style={styles.tabBar}>
            {tabs.map((tab) => {
                const isActive =
                    pathname === tab.name ||
                    (tab.name === "/" && pathname === "/");

                return (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => router.push(tab.name as any)}
                        style={styles.tabItem}
                    >
                        <Feather
                            name={tab.icon as any}
                            size={24}
                            color={isActive ? COLORS.white : COLORS.gray}
                        />
                        {isActive && (
                            <Text style={[styles.tabText, styles.activeText]}>
                                {tab.label}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

// ... keep your existing styles ...
const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        backgroundColor: COLORS.primary,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingVertical: 18,
        justifyContent: "space-around",
        alignItems: "center",
    },
    tabItem: {
        alignItems: "center",
        justifyContent: "center",
    },
    tabText: {
        fontSize: 12,
        color: COLORS.gray,
        marginTop: 2,
    },
    activeText: {
        color: COLORS.white,
        fontWeight: "bold",
    },
});
