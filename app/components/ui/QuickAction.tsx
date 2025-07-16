import COLORS from '@/app/constants/color'
import tw from '@/assets/lib/tailwind'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

const QuickAction = () => {
    return (
        <View style={tw`flex-row justify-between mb-6 `}>
            <View style={tw`w-[30%] bg-[${COLORS.secondary}] border border-[#686868] p-3 rounded-xl items-center`}>
                <Feather name="clock" size={24} color="white" />
                <Text style={tw`text-white text-sm mt-2`}>Trip History</Text>
            </View>
            <View style={tw`w-[30%] bg-[${COLORS.secondary}] border border-[#686868] p-3 rounded-xl items-center`}>
                <Feather name="map-pin" size={24} color="white" />
                <Text style={tw`text-white text-sm mt-2`}>Track Bus</Text>
            </View>
            <View style={tw`w-[30%] bg-[${COLORS.secondary}] border border-[#686868] p-3 rounded-xl items-center`}>
                <Feather name="phone" size={24} color="white" />
                <Text style={tw`text-white text-sm mt-2`}>Contact</Text>
            </View>
        </View>
    )
}

export default QuickAction