import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Image, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native'

import tw from '@/assets/lib/tailwind'
import * as ImagePicker from 'expo-image-picker'
import COLORS from '../constants/color'

const confirmRegistration = () => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [countryCode, setCountryCode] = useState('+44')
    const router = useRouter();

    // Image picker functionality
    const pickImage = async () => {
        // Request permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    // Camera functionality
    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "Permission to access camera is required!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    // Show options for image selection
    const showImagePicker = () => {
        Alert.alert(
            "Select Image",
            "Choose an option",
            [
                { text: "Camera", onPress: takePhoto },
                { text: "Gallery", onPress: pickImage },
                { text: "Cancel", style: "cancel" }
            ]
        );
    };

    return (
        <View style={tw`flex-1 bg-[${COLORS.backgroundcolor}] px-6`}>
            <StatusBar barStyle="light-content" />

            {/* Logo Section */}
            <View style={tw`items-center mt-20 mb-8`}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    resizeMode='none'
                    style={tw`flex flex-row items-center justify-center w-[250px] h-[100px]`}
                />
            </View>

            {/* Upload Picture Section */}
            <View style={tw`items-center mb-8`}>
                <TouchableOpacity onPress={showImagePicker} style={tw`items-center`}>
                    <View style={tw`w-32 h-32 rounded-full border-2 border-blue-500 items-center justify-center mb-4`}>
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage }}
                                style={tw`w-full h-full rounded-full`}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={tw`w-16 h-16 items-center justify-center`}>
                                {/* Camera Icon - you can replace this with your camera icon */}
                                <View style={tw`w-12 h-8 border-2 border-blue-500 rounded-md relative`}>
                                    <View style={tw`w-6 h-6 border-2 border-blue-500 rounded-full absolute top-1 left-3`} />
                                    <View style={tw`w-3 h-2 bg-blue-500 rounded-t-md absolute -top-1 left-4.5`} />
                                </View>
                            </View>
                        )}
                    </View>
                    <Text style={tw`text-blue-400 text-lg font-medium`}>Upload Picture</Text>
                </TouchableOpacity>
            </View>

            {/* Phone Number Input */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-white text-base mb-3`}>Phone Number</Text>
                <View style={tw`flex-row`}>
                    {/* Country Code Selector */}
                    <TouchableOpacity style={tw`bg-[#4B4B4B] px-4 h-[52px] rounded-xl mr-3 flex-row items-center justify-center min-w-20`}>
                        <Text style={tw`text-2xl mr-2`}>🇬🇧</Text>
                        <Text style={tw`text-white text-base`}>+44</Text>
                    </TouchableOpacity>

                    {/* Phone Number Input */}
                    <TextInput
                        style={tw`bg-[#4B4B4B] text-white px-4 h-[52px] rounded-xl text-base flex-1`}
                        placeholder="Mobile number"
                        placeholderTextColor="#9CA3AF"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            {/* Address Input */}
            <View style={tw`mb-8`}>
                <Text style={tw`text-white text-base mb-3`}>Address</Text>
                <TextInput
                    style={tw`bg-[#4B4B4B] text-white px-4 py-4 rounded-xl text-base h-32`}
                    placeholder="Enter address here"
                    placeholderTextColor="#9CA3AF"
                    value={address}
                    onChangeText={setAddress}
                    multiline={true}
                    textAlignVertical="top"
                />
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
                onPress={() => router.push('/(tabs)')}
                style={tw`bg-[${COLORS.primary}] h-[56px] flex items-center justify-center rounded-xl mb-8`}
            >
                <Text style={tw`text-white text-center text-lg font-semibold`}>Sign Up</Text>
            </TouchableOpacity>

            {/* Sign In Link */}
            <View style={tw`flex-row justify-center pb-8`}>
                <Text style={tw`text-gray-400 text-base`}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(authscreen)/login')}>
                    <Text style={tw`text-[${COLORS.primary}] text-base`}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default confirmRegistration