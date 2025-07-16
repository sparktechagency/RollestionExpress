import COLORS from '@/app/constants/color'
import tw from '@/assets/lib/tailwind'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const BallanceCard = () => {
    return (
        <View style={tw`flex-row bg-white rounded-xl overflow-hidden mb-6`}>

            <LinearGradient style={tw` w-2/4 justify-center items-center  pr-6 py-6 mx-auto`} colors={['#1976D2', '#0D3D6C']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }} >


                <Text style={tw`text-white text-[27px] font-semibold text-center`}>Balance</Text>
                <Text style={tw`text-[${COLORS.green}]  text-[33px] font-semibold mb-2 text-center`}>$ 7.00</Text>


                <TouchableOpacity
                    onPress={() => router.push('/(screens)/AddTopup')}
                    activeOpacity={0.8}
                    style={tw`w-[118px] mx-auto border-[#95C0EA] border-2 rounded-xl overflow-hidden`}
                >
                    <LinearGradient
                        colors={['#1976D2', '#0D3D6C']}
                        start={{ x: 0, y: 0 }}   // Top
                        end={{ x: 0, y: 1 }}     // Bottom
                        style={tw`p-1 rounded-xl flex-row items-center justify-center`}
                    >
                        <Text style={tw`text-white text-lg font-semibold`}>+ Top Up</Text>
                    </LinearGradient>
                </TouchableOpacity>


            </LinearGradient>
            <View style={tw`flex-1 items-center justify-center`}>
                <Image
                    source={require('../../../assets/images/barCode.png')}

                    resizeMode="stretch"
                />
            </View>
        </View>
    )
}

export default BallanceCard