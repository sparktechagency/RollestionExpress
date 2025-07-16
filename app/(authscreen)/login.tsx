import { eyecloseicon, eyeopenicon, googleicon } from '@/assets/icon/Icon'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'
import COLORS from '../constants/color'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();
    return (
        <View style={tw`flex-1 bg-[${COLORS.backgroundcolor}] px-6`}>
            <StatusBar barStyle="light-content" />

            {/* Logo Section */}
            <View style={tw`items-center mt-20 `}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    resizeMode='none'
                    style={tw`flex flex-row items-center justify-center w-[250px] h-[100px]`}
                />

            </View>

            {/* Email Input */}
            <View style={tw`mb-6`}>
                <Text style={tw`text-white text-base mb-1`}>Email</Text>
                <TextInput
                    style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base`}
                    placeholder="Enter email"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            {/* Password Input */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-white text-base mb-1`}>Password</Text>
                <View style={tw`relative`}>
                    <TextInput
                        style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base pr-12`}
                        placeholder="Enter password"
                        placeholderTextColor="#9CA3AF"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={tw`absolute right-4 top-4`}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <SvgXml xml={`${showPassword ? eyecloseicon : eyeopenicon}`} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={() => router.push('/(authscreen)/forgetpassword')} style={tw`self-end mb-8`}>
                <Text style={tw`text-[#1976D2] text-[14px]   text-base`}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity onPress={() => router.push('/(authscreen)/SelectAccountType')} style={tw`bg-[${COLORS.primary}] h-[56px] flex items-center justify-center rounded-xl mb-2`}>
                <Text style={tw`text-white text-center text-lg font-semibold`}>Sign in</Text>
            </TouchableOpacity>

            {/* Or Sign in with */}
            <Text style={tw`text-gray-400 text-center text-base mb-6`}>Or Sign in with</Text>

            {/* Google Sign In Button */}
            <TouchableOpacity style={tw` items-center mb-auto`}>
                <SvgXml xml={googleicon} />
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={tw`flex-row justify-center pb-8`}>
                <Text style={tw`text-gray-400 text-base`}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(authscreen)/signup')}>
                    <Text style={tw`text-[${COLORS.primary}] text-base`}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Login