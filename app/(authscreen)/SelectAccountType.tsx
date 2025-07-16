import { backicon, childicon, usericon } from '@/assets/icon/Icon'
import { useNavigation, useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import tw from 'twrnc'
import COLORS from '../constants/color'

const SelectAccountType = () => {
    const [selectedType, setSelectedType] = useState('adult')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const navigation = useNavigation();
    const router = useRouter();
    const handleSkip = () => {
        // Handle skip
        router.push('/(tabs)')
    }



    const handleContinue = () => {
        // Handle continue with selected type and date
        router.push('/(tabs)')
    }

    return (
        <View style={tw`flex-1 bg-[${COLORS.backgroundcolor}] px-4`}>


            {/* Header */}
            <View style={tw`flex-row items-center justify-between mt-12 mb-8`}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw`py-2`}>
                    <SvgXml xml={backicon} />
                </TouchableOpacity>

                <Text style={tw`text-white text-lg font-semibold`}>Select Rider Type</Text>

                <TouchableOpacity onPress={handleSkip} style={tw`p-2`}>
                    <Text style={tw`text-white text-base`}>Skip</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={tw`flex-1`}>
                {/* Title and Subtitle */}
                <Text style={tw`text-white text-2xl font-bold mb-3`}>Who is this account for?</Text>
                <Text style={tw`text-gray-400 text-base mb-8`}>Your fare will be adjusted based on your age group.</Text>

                {/* Adult Option */}
                <TouchableOpacity
                    onPress={() => setSelectedType('adult')}
                    style={tw`border-2 ${selectedType === 'adult' ? `border-[${COLORS.primary}]` : 'border-gray-600'} rounded-xl p-4 mb-4`}
                >
                    <View style={tw`flex-row items-center`}>
                        {/* Adult Icon */}
                        <View style={tw`w-12 h-12  rounded-full items-center justify-center mr-4`}>

                            <SvgXml xml={usericon} />

                        </View>

                        <View style={tw`flex-1`}>
                            <View style={tw`flex-row items-center mb-1`}>
                                <Text style={tw`text-white text-xl font-semibold mr-3`}>Adult</Text>
                                <View style={tw`bg-blue-500 px-2 py-1 rounded`}>
                                    <Text style={tw`text-white text-xs font-semibold`}>18+</Text>
                                </View>
                            </View>
                            <Text style={tw`text-gray-400 text-sm`}>Standard fare for adult passengers</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Child Option */}
                <TouchableOpacity
                    onPress={() => setSelectedType('child')}
                    style={tw`border-2 ${selectedType === 'child' ? `border-[${COLORS.primary}]` : 'border-gray-600'} rounded-xl p-4 mb-8`}
                >
                    <View style={tw`flex-row items-center`}>
                        {/* Child Icon */}
                        <View style={tw`w-12 h-12 items-center justify-center mr-4`}>

                            <SvgXml xml={childicon} />

                        </View>

                        <View style={tw`flex-1`}>
                            <View style={tw`flex-row items-center mb-1`}>
                                <Text style={tw`text-white text-xl font-semibold mr-3`}>Child</Text>
                                <View style={tw`bg-green-500 px-2 py-1 rounded`}>
                                    <Text style={tw`text-white text-xs font-semibold`}>Under 18</Text>
                                </View>
                            </View>
                            <Text style={tw`text-gray-400 text-sm`}>Discounted fare for children under 18</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Date of Birth Section */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-xl font-semibold mb-4`}>Enter Date of Birth</Text>
                    <TextInput
                        style={tw` border border-gray-600 text-white px-4 py-4 rounded-xl text-base`}
                        placeholder="mm/dd/yyyy"
                        placeholderTextColor="#9CA3AF"
                        value={dateOfBirth}
                        onChangeText={setDateOfBirth}
                        keyboardType="numeric"
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

export default SelectAccountType