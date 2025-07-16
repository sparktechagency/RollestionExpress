
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';
import COLORS from '../constants/color';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const MoreVertIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </Svg>
);

const VisaIcon = ({ width = 47, height = 26 }: { width?: number, height?: number }) => (
    <Svg width={width} height={height} viewBox="0 0 47 26">
        <Path d="M14.58.234H9.088L5.58 18.06h5.498l3.502-17.826zM26.93 6.13c-.025-2.83-2.227-4.48-5.15-4.48-2.948 0-4.946 1.423-4.946 3.47 0 .6.326.974.825 1.224l.025.025c.574.225.875.4.9.65l.024.3c.125 1.223 1.124 1.822 2.172 1.822 1.074 0 1.623-.425 1.848-1.025l.275-1.024c.025-.1.05-.2.1-.325l.425-1.673zm-2.822 7.242c.6 0 1.024-.225 1.224-.874l.9-3.97c.1-.5.125-.85.125-1.024 0-1.224-.7-1.923-1.872-1.923-1.324 0-2.123.7-2.123 1.573 0 .375.2.65.524.85.4.2.65.35.775.524l.5 2.1c.1.425.425.925 1.024.925zM33.02 18.06h5.54L34.54.234h-4.97l-4.02 17.826h5.5l.42-2.3h3.55zM30.84 13.96l1.5-7.14 1.03 7.14h-2.53zM.016.234L0 1.01c2.572.574 4.47 1.823 5.494 3.42l-5.494.025v5.494h10.99V4.434c0-2.826-2.073-4.2-4.97-4.2H.016z" fill="#fff" />
    </Svg>
);

const MastercardIcon = ({ width = 24, height = 15 }: { width?: number, height?: number }) => (
    <Svg width={width} height={height} viewBox="0 0 24 15">
        <Path d="M14.85 7.5a7.5 7.5 0 0 1-7.35 7.5 7.5 7.5 0 1 1 7.35-7.5z" fill="#EB001B" />
        <Path d="M24 7.5a7.5 7.5 0 0 1-14.7 3.39A7.5 7.5 0 0 0 16.5 0a7.5 7.5 0 0 1 7.5 7.5z" fill="#F79E1B" />
    </Svg>
);




// --- Reusable Components --- //

const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => (
    <TouchableOpacity
        style={tw.style(`w-12 h-6 rounded-full justify-center`, value ? 'bg-blue-500' : 'bg-gray-600')}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.8}
    >
        <View style={tw.style(`w-5 h-5 bg-white rounded-full shadow`, value ? 'self-end mr-0.5' : 'self-start ml-0.5 ')} />
    </TouchableOpacity>
);

const AddNewCardModal = ({ visible, onClose }: { visible: boolean; onClose: () => void; }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={tw`flex-1 justify-end bg-black/50`}>
            <TouchableOpacity style={tw`flex-1`} onPress={onClose} />
            <View style={tw`bg-[#1E1E1E] p-5 rounded-t-2xl`}>
                <Text style={tw`text-white text-xl font-bold mb-5`}>Add New Card</Text>

                <View style={tw`mb-4`}>
                    <Text style={tw`text-white text-sm mb-2`}>Card Number</Text>
                    <View style={tw`bg-[#2D2D2D] rounded-lg h-12 px-4 flex-row items-center justify-between`}>
                        <TextInput
                            placeholder="•••• •••• •••• ••••"
                            placeholderTextColor="#888"
                            style={tw`text-white flex-1`}
                            keyboardType="number-pad"
                        />
                        <View style={tw`flex-row items-center gap-1`}>
                            <VisaIcon width={30} height={18} />
                            <MastercardIcon width={20} height={12} />
                        </View>
                    </View>
                </View>

                <View style={tw`mb-4`}>
                    <Text style={tw`text-white text-sm mb-2`}>Cardholder Name</Text>
                    <TextInput
                        placeholder="Enter name"
                        placeholderTextColor="#888"
                        style={tw`bg-[#2D2D2D] rounded-lg h-12 px-4 text-white`}
                    />
                </View>

                <View style={tw`flex-row gap-4 mb-6`}>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-white text-sm mb-2`}>Expiration Date</Text>
                        <TextInput
                            placeholder="MM/YYYY"
                            placeholderTextColor="#888"
                            style={tw`bg-[#2D2D2D] rounded-lg h-12 px-4 text-white`}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-white text-sm mb-2`}>CVV</Text>
                        <TextInput
                            placeholder="•••"
                            placeholderTextColor="#888"
                            style={tw`bg-[#2D2D2D] rounded-lg h-12 px-4 text-white`}
                            keyboardType="number-pad"
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={tw`bg-blue-600 rounded-lg py-3.5 items-center`}
                    onPress={onClose} // Closes modal on success
                >
                    <Text style={tw`text-white font-semibold text-base`}>Add Card</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

// --- Main Component --- //

const PaymentMethod = () => {
    const [autoTopUp, setAutoTopUp] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] `}>


            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Payment methods</Text>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                {/* Credit Card */}
                <View style={tw`bg-[#1E1E1E] rounded-lg p-4 mb-6`}>
                    <View style={tw`flex-row justify-between items-start`}>
                        <Image source={require('../../assets/images/visa.png')} />
                        <TouchableOpacity>
                            <MoreVertIcon style={tw`text-white`} />
                        </TouchableOpacity>
                    </View>
                    <Text style={tw`text-white text-lg font-normal tracking-widest my-4`}>•••• •••• •••• 3421</Text>
                    <View style={tw`flex-row justify-between items-end`}>
                        <View style={tw`flex-row items-center gap-2`}>
                            <Text style={tw`text-gray-400 text-xs`}>Secured by</Text>
                            <Text style={tw`text-[${COLORS.primary}]`}>stripe</Text>
                        </View>
                        <Text style={tw`text-white text-sm`}>Exp: 04/28</Text>
                    </View>
                </View>


                {/* Auto Top-Up */}
                <View style={tw`bg-[#1E1E1E] rounded-lg p-4 flex-row items-center`}>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-white text-base font-semibold`}>Enable Auto Top-Up</Text>
                        <Text style={tw`text-gray-400 text-xs mt-1 leading-snug`}>
                            Automatically add $35 (+ $0.30 fee) when balance falls below $3.50
                        </Text>
                    </View>
                    <ToggleSwitch value={autoTopUp} onValueChange={setAutoTopUp} />
                </View>

            </ScrollView>

            {/* Add New Card Button */}
            <View style={tw`px-5 py-4 mb-8`}>
                <TouchableOpacity
                    style={tw`bg-blue-600 rounded-lg py-3.5 items-center`}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={tw`text-white font-semibold`}>Add New Card</Text>
                </TouchableOpacity>
            </View>

            <AddNewCardModal visible={isModalVisible} onClose={() => setModalVisible(false)} />

        </SafeAreaView>
    );
}

export default PaymentMethod;
