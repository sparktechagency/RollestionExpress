import { eyecloseicon, eyeopenicon } from '@/assets/icon/Icon'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
// NEW: Import Keyboard-related components
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'
import COLORS from '../constants/color'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter();

    // UPDATED: Replaced the root View with KeyboardAvoidingView
    return (
        <KeyboardAvoidingView
            style={tw`flex-1 bg-[${COLORS.backgroundcolor}]`}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={tw`flex-grow`}
                keyboardShouldPersistTaps="handled"
            >
                {/* NEW: This allows dismissing the keyboard by tapping outside */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={tw`flex-1 px-6 justify-between`}>
                        {/* Top section for inputs */}
                        <View>
                            {/* Logo Section */}
                            <View style={tw`items-center mt-20`}>
                                <Image
                                    source={require('../../assets/images/logo.png')}
                                    resizeMode='contain' // Use 'contain' to ensure the logo fits well
                                    style={tw`w-[250px] h-[100px]`}
                                />
                            </View>

                            {/* Email Input */}
                            <View style={tw`mb-6 mt-10`}>
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
                                        style={tw`absolute right-4 top-3.5`} // Adjusted position slightly for better alignment
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <SvgXml xml={`${showPassword ? eyecloseicon : eyeopenicon}`} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Forgot Password */}
                            <TouchableOpacity onPress={() => router.push('/(authscreen)/forgetpassword')} style={tw`self-end mb-8`}>
                                <Text style={tw`text-[#1976D2] text-base`}>Forgot Password?</Text>
                            </TouchableOpacity>

                            {/* Sign In Button */}
                            <TouchableOpacity onPress={() => router.push('/(authscreen)/SelectAccountType')} style={tw`bg-[${COLORS.primary}] h-[56px] flex items-center justify-center rounded-xl mb-2`}>
                                <Text style={tw`text-white text-center text-lg font-semibold`}>Sign in</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Bottom section for sign-up link */}
                        <View style={tw`flex-row justify-center pb-8`}>
                            <Text style={tw`text-gray-400 text-base`}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => router.push('/(authscreen)/signup')}>
                                <Text style={tw`text-[${COLORS.primary}] text-base`}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login