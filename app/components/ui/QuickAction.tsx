import COLORS from '@/app/constants/color'
import tw from '@/assets/lib/tailwind'
import { Feather } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const QuickAction = () => {
    return (
        <View style={tw`flex-row justify-between mb-6 `}>
            <TouchableOpacity onPress={() => router.push('/(screens)/triphistory')} style={tw`w-[30%] bg-[${COLORS.secondary}] border border-[#686868] p-3 rounded-xl items-center`}>
                <Feather name="clock" size={24} color="white" />
                <Text style={tw`text-white text-sm mt-2`}>Trip History</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(screens)/trackBus')} style={tw`w-[30%] bg-[${COLORS.secondary}] border border-[#686868] p-3 rounded-xl items-center`}>
                <Feather name="map-pin" size={24} color="white" />
                <Text style={tw`text-white text-sm mt-2`}>Track Bus</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(screens)/contact')} style={tw`w-[30%] bg-[${COLORS.secondary}] border border-[#686868] p-3 rounded-xl items-center`}>
                <Feather name="phone" size={24} color="white" />
                <Text style={tw`text-white text-sm mt-2`}>Contact</Text>
            </TouchableOpacity>
        </View>
    )
}

export default QuickAction