import { backicon, forgetpassicon } from '@/assets/icon/Icon'
import { useRouter } from 'expo-router'
import React, { useRef, useState } from 'react'
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'

const OtpVerifyPage: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const inputRefs = useRef<(TextInput | null)[]>([])
    const router = useRouter()


    const handleOtpChange = (value: string, index: number): void => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            // Move to next input if value is entered
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus()
                setActiveIndex(index + 1)
            }
        }
    }

    const handleKeyPress = (key: string, index: number): void => {
        if (key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
            setActiveIndex(index - 1)
        }
    }

    const handleResendOtp = (): void => {
        Alert.alert('OTP Resent', 'A new OTP has been sent to your email.')
        // Add your resend OTP logic here
        console.log('Resend OTP')
    }

    const handleVerify = (): void => {
        const otpString = otp.join('')
        if (otpString.length === 6) {
            console.log('Verify OTP:', otpString)
            // Add your OTP verification logic here
            router.push('/(authscreen)/createnewpassword')
        } else {
            Alert.alert('Invalid OTP', 'Please enter all 6 digits.')
        }
    }

    const isOtpComplete = otp.every(digit => digit !== '')

    return (
        <View style={tw`flex-1 bg-[#151515] px-4`}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={tw`flex-row items-center mt-12 mb-16`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`py-2`}>
                    <SvgXml xml={backicon} />
                </TouchableOpacity>

                <Text style={tw`text-white text-lg font-semibold ml-4`}>OTP</Text>
            </View>

            {/* Main Content */}
            <View style={tw`flex-1 items-center`}>
                {/* Instruction Text */}
                <Text style={tw`text-white text-base text-start mb-16 px-4 leading-6`}>
                    Please enter the OTP we have sent you in your email.
                </Text>

                <SvgXml xml={forgetpassicon} />

                {/* OTP Input Boxes */}
                <View style={tw`flex-row gap-2 justify-between w-full mt-8 mb-6  `}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => {
                                inputRefs.current[index] = ref;
                            }}
                            style={tw`w-[55px] h-[64px]  border-2 ${activeIndex === index ? 'border-[#1976D2]' : 'border-gray-600'
                                } rounded-xl text-white text-2xl text-center font-semibold`}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                            onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                            onFocus={() => setActiveIndex(index)}
                            keyboardType="numeric"
                            maxLength={1}
                            selectTextOnFocus
                        />
                    ))}
                </View>

                {/* Resend OTP Section */}
                <View style={tw`flex-row items-center justify-between mb-auto w-full`}>
                    <Text style={tw`text-white text-[14px] mr-2 `}>Did not get the OTP?</Text>
                    <TouchableOpacity onPress={handleResendOtp}>
                        <Text style={tw`text-blue-400 text-[14px] font-medium`}>Resend OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
                onPress={handleVerify}
                style={tw`bg-blue-500 py-3 rounded-xl mb-8 ${!isOtpComplete ? 'opacity-50' : ''
                    }`}
                disabled={!isOtpComplete}
            >
                <Text style={tw`text-white text-center text-lg font-semibold`}>Verify</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OtpVerifyPage