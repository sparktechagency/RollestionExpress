import { backicon, eyecloseicon, eyeopenicon } from '@/assets/icon/Icon'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'
import COLORS from '../constants/color'

const CreateNewPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const router = useRouter();
    const handleBack = (): void => {
        console.log('Back pressed')
    }

    const validatePassword = (password: string): boolean => {
        return password.length >= 8 && password.length <= 10
    }

    const handleResetPassword = (): void => {
        if (!password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in both password fields.')
            return
        }

        if (!validatePassword(password)) {
            Alert.alert('Error', 'Password must be 8-10 characters.')
            return
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match.')
            return
        }

        console.log('Reset password with:', password)
        Alert.alert('Success', 'Password has been reset successfully!')

        router.push('/(tabs)')
    }

    const isFormValid = password && confirmPassword && validatePassword(password) && password === confirmPassword

    return (
        <View style={tw`flex-1 bg-[${COLORS.backgroundcolor}] px-4`}>
            <StatusBar barStyle="light-content" backgroundColor="#000000" />

            {/* Header */}
            <View style={tw`flex-row items-center mt-12 mb-16`}>
                <TouchableOpacity onPress={() => router.back()} style={tw`py-2`}>
                    <SvgXml xml={backicon} />
                </TouchableOpacity>
                <Text style={tw`text-white text-lg font-semibold ml-4`}>Set A New Password</Text>
            </View>

            {/* Main Content */}
            <View style={tw`flex-1`}>
                {/* Instruction Text */}
                <Text style={tw`text-[#FFFFFF] text-base text-start  mb-8`}>
                    Your password must be 8-10 characters.
                </Text>

                {/* Password Input */}
                <View style={tw`mb-3`}>
                    <Text style={tw`text-white text-base font-normal mb-1`}>Password</Text>
                    <View style={tw`relative`}>
                        <TextInput
                            style={tw`bg-[#4B4B4B] text-white px-4 py-3 rounded-xl text-base pr-12 border border-[#535770]`}
                            placeholder="Enter password"
                            placeholderTextColor="#9CA3AF"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={tw`absolute right-4 top-4`}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <View style={tw`w-6 h-6 items-center justify-center`}>
                                {showPassword ? (
                                    <SvgXml xml={eyeopenicon} />
                                ) : (
                                    <SvgXml xml={eyecloseicon} />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Confirm Password Input */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-base font-normal mb-1`}>Confirm Password</Text>
                    <View style={tw`relative`}>
                        <TextInput
                            style={tw`bg-[#4B4B4B] text-white px-4 py-3 rounded-xl text-base pr-12 border border-[#535770]`}
                            placeholder="Confirm password"
                            placeholderTextColor="#9CA3AF"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                        <TouchableOpacity
                            style={tw`absolute right-4 top-4`}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <View style={tw`w-6 h-6 items-center justify-center`}>
                                {showConfirmPassword ? (
                                    <SvgXml xml={eyeopenicon} />
                                ) : (
                                    <SvgXml xml={eyecloseicon} />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Password Validation Feedback */}
                {password && (
                    <View style={tw`mb-1`}>
                        <Text style={tw`${validatePassword(password) ? 'text-green-400' : 'text-red-400'} text-sm`}>
                            {validatePassword(password) ? '✓ Password length is valid' : '✗ Password must be 8-10 characters'}
                        </Text>
                        {confirmPassword && (
                            <Text style={tw`${password === confirmPassword ? 'text-green-400' : 'text-red-400'} text-sm mt-1`}>
                                {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                            </Text>
                        )}
                    </View>
                )}
            </View>

            {/* Reset Password Button */}
            <TouchableOpacity
                onPress={handleResetPassword}
                style={tw`bg-[${COLORS.primary}] py-3 rounded-xl mb-8 ${!isFormValid ? 'opacity-50' : ''
                    }`}
                disabled={!isFormValid}
            >
                <Text style={tw`text-white text-center text-lg font-semibold`}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateNewPassword