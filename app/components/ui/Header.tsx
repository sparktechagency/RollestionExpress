import tw from '@/assets/lib/tailwind'
import React from 'react'
import { Image, Text, View } from 'react-native'

const Header = () => {
    return (

        <View style={tw`flex-row items-center mb-5`}>
            <Image
                source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                style={tw`w-12 h-12 rounded-full`}
            />
            <View style={tw`ml-3`}>
                <Text style={tw`text-white text-xl font-bold`}>Hi Liam 👋</Text>
                <Text style={tw`text-gray-400`}>@liam_123</Text>
            </View>
        </View>
    )
}

export default Header