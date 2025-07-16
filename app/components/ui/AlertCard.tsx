import COLORS from '@/app/constants/color'
import tw from '@/assets/lib/tailwind'
import { Alert } from '@/assets/lib/types/Alertypes'
import { Feather, FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

const AlertCard = ({ alert }: { alert: Alert }) => {


    return (
        <View style={tw`bg-[${COLORS.secondary}] border border-[#686868] p-4 rounded-xl`}>
            <View style={tw`flex-row items-center mb-2`}>
                {alert.type === 'warning' ? (
                    <FontAwesome name="warning" size={18} color="orange" />
                ) : (
                    <Feather name="info" size={18} color="#3b82f6" />
                )}
                <Text style={tw`text-white font-semibold ml-2`}>{alert.title}</Text>
            </View>
            <Text style={tw`text-gray-300 text-sm`}>{alert.message}</Text>
            <Text style={tw`text-gray-500 text-xs mt-1`}>{alert.time}</Text>
        </View>
    )
}


export default AlertCard