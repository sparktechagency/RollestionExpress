import { changepaswordicon } from '@/assets/icon/Icon';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path, SvgXml } from 'react-native-svg';
import tw from 'twrnc';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const PasswordLockIcon = ({ style }: { style?: any }) => (
    <Svg width="64" height="64" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM8.9 6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2H8.9V6z" />
    </Svg>
);

const LockIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </Svg>
);

const EyeIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm0-7C10.62 9.5 9.5 10.62 9.5 12s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5S13.38 9.5 12 9.5z" />
    </Svg>
);

const EyeOffIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-4 .7l2.17 2.17C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.38 1.12 2.5 2.5 2.5.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.48 0-4.5-2.02-4.5-4.5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.38-1.12-2.5-2.5-2.5l-.16.02z" />
    </Svg>
);

// --- Reusable Components --- //

const PasswordInput = ({ label, value, onChangeText }: { label: string; value: string; onChangeText: (text: string) => void; }) => {
    const [isSecure, setSecure] = useState(true);
    return (
        <View style={tw`gap-2`}>
            <Text style={tw`text-white text-base font-semibold`}>{label}</Text>
            <View style={tw`bg-[#1E1E1E] rounded-lg border border-gray-700 h-14 flex-row items-center px-4`}>
                <LockIcon style={tw`text-gray-500`} />
                <TextInput
                    style={tw`flex-1 text-white ml-3`}
                    placeholder="*******"
                    placeholderTextColor="#686868"
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={isSecure}
                />
                <TouchableOpacity onPress={() => setSecure(!isSecure)}>
                    {isSecure ? <EyeOffIcon style={tw`text-gray-500`} /> : <EyeIcon style={tw`text-gray-500`} />}
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Main Component --- //

const ChangePassword = () => {
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        retype: '',
    });

    const handleInputChange = (field: keyof typeof passwords, value: string) => {
        setPasswords(prev => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] `}>


            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Password Change</Text>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                {/* Icon */}
                <View style={tw`items-center my-8`}>
                    <SvgXml xml={changepaswordicon} />
                </View>

                {/* Form */}
                <View style={tw`gap-6`}>
                    <PasswordInput
                        label="Current Password"
                        value={passwords.current}
                        onChangeText={(val) => handleInputChange('current', val)}
                    />
                    <PasswordInput
                        label="New Password"
                        value={passwords.new}
                        onChangeText={(val) => handleInputChange('new', val)}
                    />
                    <PasswordInput
                        label="Retype Password"
                        value={passwords.retype}
                        onChangeText={(val) => handleInputChange('retype', val)}
                    />
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

export default ChangePassword;
