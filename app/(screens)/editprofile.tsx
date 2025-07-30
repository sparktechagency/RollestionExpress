import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';
// Assuming expo-router is used for navigation
// import { router } from 'expo-router';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const CameraIcon = ({ style }: { style?: any }) => (
    <Svg width="16" height="16" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-10c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
        <Path fill="currentColor" d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-10c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" opacity=".3" />
        <Path fill="currentColor" d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </Svg>
);

const UserIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Svg>
);

const EmailIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </Svg>
);

const PhoneIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.74-.25 1.02l-2.2 2.2z" />
    </Svg>
);

const LockIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </Svg>
);

const ChevronRightIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fillRule="evenodd" fill="currentColor" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </Svg>
);

// --- Reusable Components --- //

const FormInput = ({ icon, value, onChangeText, placeholder }: { icon: React.ReactNode; value: string; onChangeText: (text: string) => void; placeholder: string; }) => (
    <View style={tw`bg-[#1E1E1E] rounded-lg border border-gray-700 h-14 flex-row items-center px-4`}>
        {icon}
        <TextInput
            style={tw`flex-1 text-white ml-3`}
            placeholder={placeholder}
            placeholderTextColor="#888"
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

// --- Main Component --- //

const EditProfile = () => {
    const [profile, setProfile] = useState({
        name: 'Liam Bentley',
        email: 'LiamBentley@email.com',
        phone: '+88011111111111111',
    });
    const [image, setImage] = useState('https://i.pravatar.cc/150?img=12');

    const handleInputChange = (field: keyof typeof profile, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    const pickImage = async () => {
        // Request media library permissions
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert("Permission Required", "You've refused to allow this app to access your photos.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-12`}>


            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Edit Profile</Text>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                {/* Profile Picture */}
                <View style={tw`items-center my-8`}>
                    <View>
                        <Image
                            source={{ uri: image }}
                            style={tw`w-28 h-28 rounded-full`}
                        />
                        <TouchableOpacity
                            onPress={pickImage}
                            style={tw`absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full border-2 border-[#151515]`}
                        >
                            <CameraIcon style={tw`text-white`} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Form */}
                <View style={tw`gap-4`}>
                    <FormInput
                        icon={<UserIcon style={tw`text-blue-400`} />}
                        value={profile.name}
                        onChangeText={(val) => handleInputChange('name', val)}
                        placeholder="Full Name"
                    />
                    <FormInput
                        icon={<EmailIcon style={tw`text-blue-400`} />}
                        value={profile.email}
                        onChangeText={(val) => handleInputChange('email', val)}
                        placeholder="Email Address"
                    />
                    <FormInput
                        icon={<PhoneIcon style={tw`text-blue-400`} />}
                        value={profile.phone}
                        onChangeText={(val) => handleInputChange('phone', val)}
                        placeholder="Phone Number"
                    />
                    <TouchableOpacity
                        style={tw`bg-[#1E1E1E] rounded-lg border border-gray-700 h-14 flex-row items-center px-4`}
                        onPress={() => { router.push('/(screens)/changepassword') }}
                    >
                        <LockIcon style={tw`text-blue-400`} />
                        <Text style={tw`flex-1 text-white ml-3`}>Change Password</Text>
                        <ChevronRightIcon style={tw`text-white`} />
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Save Button */}
            <View style={tw`px-5 py-4`}>
                <TouchableOpacity style={tw`bg-blue-600 rounded-lg py-4 items-center`}>
                    <Text style={tw`text-white font-semibold`}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default EditProfile;
