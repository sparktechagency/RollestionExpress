import { backicon, emailicon } from '@/assets/icon/Icon'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'
import COLORS from '../constants/color'

const ForgetPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('')
    // const navigation = useNavigation()
    const router = useRouter()

    const handleContinue = (): void => {
        router.push('/(authscreen)/otpverifypage')
    }

    return (
        <View style={tw`flex-1 bg-[${COLORS.backgroundcolor}] px-4`}>


            {/* Header */}
            <View style={tw`flex-row items-center mt-12 mb-16 `}>
                <TouchableOpacity onPress={() => router.back()} style={tw`py-2`}>
                    <SvgXml xml={backicon} />
                </TouchableOpacity>

                <Text style={tw`text-white text-lg font-semibold ml-4`}>Forgot Password</Text>
            </View>

            {/* Main Content */}
            <View style={tw`flex-1 items-center`}>
                {/* Instruction Text */}
                <Text style={tw`text-white text-base text-start mb-16  leading-6`}>
                    Please enter your email address for recover your password.
                </Text>

                <SvgXml xml={emailicon} />

                {/* Email Input Section */}
                <View style={tw`w-full mb-auto mt-4`}>
                    <Text style={tw`text-[#FFFFFF] text-base font-normal mb-1`}>Email</Text>
                    <TextInput
                        style={tw`border border-[#535770] bg-[#4B4B4B] text-white px-4 py-3 rounded-xl text-base`}
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={(text: string) => setEmail(text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
                onPress={handleContinue}
                style={tw`bg-[${COLORS.primary}] py-3 rounded-xl mb-8`}

            >
                <Text style={tw`text-white text-center text-lg font-semibold`}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgetPassword