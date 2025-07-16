import { router } from 'expo-router';
import React, { useState } from 'react';
import { Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import tw from 'twrnc';
// Assuming expo-router is used for navigation
// import { router } from 'expo-router';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const WarningIcon = ({ style }: { style?: any }) => (
    <Svg width="113" height="113" viewBox="0 0 24 24" style={style}>
        <Path fill="#EB2E2E" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </Svg>
);

const SuccessTickIcon = ({ style }: { style?: any }) => (
    <Svg width="80" height="80" viewBox="0 0 24 24" style={style}>
        <Circle cx="12" cy="12" r="10" fill="#4CAF50" />
        <Path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" fill="white" />
    </Svg>
);

// --- Reusable Components --- //

const SuccessModal = ({ visible, onClose }: { visible: boolean; onClose: () => void; }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={tw`flex-1 justify-center items-center bg-black/70`}>
            <View style={tw`bg-[#1E1E1E] rounded-lg p-6 w-80 items-center`}>
                <SuccessTickIcon />
                <Text style={tw`text-white text-xl font-bold text-center mt-4 mb-2`}>Account Closed</Text>
                <Text style={tw`text-gray-300 text-sm text-center mb-6`}>
                    Your account has been successfully closed. Your refund of $20.00 is being processed and will appear in your account within 3-5 business days.
                </Text>
                <TouchableOpacity onPress={onClose} style={tw`border border-gray-600 rounded-lg py-3 items-center w-full`}>
                    <Text style={tw`text-white font-semibold`}>DONE</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);


// --- Main Component --- //

const CloseAndRefund = () => {
    const [isSuccessModalVisible, setSuccessModalVisible] = useState(false);

    const handleCloseAccount = () => {
        // Here you would typically call an API to close the account
        console.log("Account closure initiated.");
        setSuccessModalVisible(true);
    };

    const handleDone = () => {
        setSuccessModalVisible(false);
        // Navigate back or to the home screen after closing the account
        // router.replace('/'); 
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-10`}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Confirm Account Closure</Text>
            </View>

            <View style={tw`flex-1 justify-between p-5`}>
                <View style={tw`items-center`}>
                    {/* Warning Icon and Text */}
                    <View style={tw`items-center gap-5 mt-8`}>
                        <WarningIcon />
                        <View style={tw`items-center gap-3`}>
                            <Text style={tw`text-white text-base font-semibold text-center`}>
                                Are you sure you want to close your account?
                            </Text>
                            <Text style={tw`text-gray-300 text-xs text-center max-w-xs`}>
                                This action is permanent. Your ride history and saved data will be deleted.
                            </Text>
                        </View>
                    </View>

                    {/* Refundable Balance Card */}
                    <View style={tw`bg-[#1E1E1E] rounded-lg p-4 mt-10 w-full`}>
                        <Text style={tw`text-white text-sm font-semibold`}>Refundable Balance</Text>
                        <Text style={tw`text-green-500 text-sm font-semibold mt-1`}>+$20.00</Text>
                        <Text style={tw`text-gray-400 text-[10px] mt-1`}>
                            This amount will be refunded to your linked card ending in **** 3421 via Stripe.
                        </Text>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={tw`gap-4`}>
                    <TouchableOpacity onPress={handleCloseAccount} style={tw`bg-red-700 rounded-lg py-4 items-center`}>
                        <Text style={tw`text-white font-semibold text-base`}>Yes, Close my Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.back()} style={tw`border border-gray-700 rounded-lg py-4 items-center`}>
                        <Text style={tw`text-white font-semibold text-base`}>Cancel & Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <SuccessModal visible={isSuccessModalVisible} onClose={handleDone} />
        </SafeAreaView>
    );
}

export default CloseAndRefund;
