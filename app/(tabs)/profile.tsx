

import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';
// Assuming expo-router is used for navigation
// import { router } from 'expo-router';

// --- SVG Icon Components --- //

const EditIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </Svg>
);

const EmailIcon = ({ style }: { style?: any }) => (
    <Svg width="16" height="16" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </Svg>
);

const PhoneIcon = ({ style }: { style?: any }) => (
    <Svg width="16" height="16" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.74-.25 1.02l-2.2 2.2z" />
    </Svg>
);

const PaymentIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </Svg>
);

const HistoryIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z" />
    </Svg>
);

const AutoTopUpIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M17 4h-3V2h-4v2H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 13H7V6h10v11z" />
        <Path fill="currentColor" d="M9 14h6v-2H9v2z" />
    </Svg>
);

const CloseAccountIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </Svg>
);

const ContactIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.02-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
    </Svg>
);

const LogoutIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </Svg>
);

const ChevronRightIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fillRule="evenodd" fill="currentColor" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </Svg>
);

// --- Reusable Components --- //

const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => (
    <TouchableOpacity
        style={tw.style(`w-12 h-6 rounded-full justify-center`, value ? 'bg-blue-500' : 'bg-gray-600')}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.8}
    >
        <View style={tw.style(`w-5 h-5 bg-white rounded-full shadow`, value ? 'self-end mr-0.5' : 'self-start ml-0.5')} />
    </TouchableOpacity>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
    <View style={tw`flex-1 h-14 bg-[#1E1E1E] rounded-md justify-center items-center`}>
        <Text style={tw`text-sm font-semibold ${label === 'Total Spent' ? 'text-green-500' : 'text-blue-400'}`}>{value}</Text>
        <Text style={tw`text-xs text-white mt-1`}>{label}</Text>
    </View>
);

const ProfileMenuItem = ({ icon, label, hasToggle, onToggle, toggleValue, onPress }: { icon: React.ReactNode; label: string; hasToggle?: boolean; onToggle?: (value: boolean) => void; toggleValue?: boolean; onPress?: () => void; }) => (
    <TouchableOpacity onPress={onPress} style={tw`flex-row items-center py-3 border-b border-gray-800`}>
        <View style={tw`w-8 h-8 rounded-full bg-white/10 justify-center items-center`}>
            {icon}
        </View>
        <Text style={tw`flex-1 text-white text-sm font-semibold ml-4`}>{label}</Text>
        {hasToggle && onToggle ? (
            <ToggleSwitch value={toggleValue || false} onValueChange={onToggle} />
        ) : (
            label !== 'Log Out' && <ChevronRightIcon style={tw`text-white`} />
        )}
    </TouchableOpacity>
);

const ConfirmationModal = ({ visible, onClose, title, message, primaryButtonText, onPrimaryButtonPress, secondaryButtonText, children }: { visible: boolean; onClose: () => void; title: string; message: string; primaryButtonText: string; onPrimaryButtonPress: () => void; secondaryButtonText: string; children?: React.ReactNode }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={tw`flex-1 justify-center items-center bg-black/70`}>
            <View style={tw`bg-[#1E1E1E] rounded-lg p-6 w-80`}>
                <Text style={tw`text-white text-xl font-bold text-center mb-2`}>{title}</Text>
                <Text style={tw`text-gray-300 text-sm text-center mb-6`}>{message}</Text>
                {children}
                <View style={tw`flex-row gap-4 mt-6`}>
                    <TouchableOpacity onPress={onClose} style={tw`flex-1 border border-gray-600 rounded-lg py-3 items-center`}>
                        <Text style={tw`text-white font-semibold`}>{secondaryButtonText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPrimaryButtonPress} style={tw`flex-1 bg-red-600 rounded-lg py-3 items-center`}>
                        <Text style={tw`text-white font-semibold`}>{primaryButtonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

// --- Main Component --- //

const Profile = () => {
    const [autoTopUp, setAutoTopUp] = useState(false);
    const [isCloseModalVisible, setCloseModalVisible] = useState(false);
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

    const menuItems = [
        { icon: <PaymentIcon style={tw`text-blue-400`} />, label: 'Payment Methods', onPress: () => { router.push('/(screens)/paymentmethod') } },
        { icon: <HistoryIcon style={tw`text-blue-400`} />, label: 'Trip History', onPress: () => { router.push('/(screens)/triphistory') } },
        { icon: <AutoTopUpIcon style={tw`text-blue-400`} />, label: 'Auto Top-Up', hasToggle: true, onToggle: setAutoTopUp, toggleValue: autoTopUp },
        { icon: <CloseAccountIcon style={tw`text-red-500`} />, label: 'Close Account', onPress: () => setCloseModalVisible(true) },
        { icon: <ContactIcon style={tw`text-blue-400`} />, label: 'Contact Us', onPress: () => { router.push('/(screens)/contact') } },
        { icon: <LogoutIcon style={tw`text-red-500`} />, label: 'Log Out', onPress: () => setLogoutModalVisible(true) },
    ];

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-6`}>


            {/* Header */}
            <View style={tw`flex-row items-center justify-between p-4`}>
                <View style={tw`w-6`} />
                <Text style={tw`text-lg font-semibold text-white`}>Profile</Text>
                <TouchableOpacity onPress={() => router.push('/(screens)/editprofile')}>
                    <EditIcon style={tw`text-white`} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                {/* Profile Card */}
                <View style={tw`bg-[#1E1E1E] rounded-lg p-5 items-center`}>
                    <View style={tw`p-1 bg-blue-500 rounded-full`}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                            style={tw`w-20 h-20 rounded-full`}
                        />
                    </View>
                    <Text style={tw`text-xl font-bold text-white mt-4`}>Liam Bentley</Text>
                    <Text style={tw`text-xs text-gray-400 mt-1`}>Member since January 2024</Text>
                    <View style={tw`mt-4 gap-2`}>
                        <View style={tw`flex-row items-center gap-2`}>
                            <EmailIcon style={tw`text-blue-400`} />
                            <Text style={tw`text-xs text-white`}>Liam@gmail.com</Text>
                        </View>
                        <View style={tw`flex-row items-center gap-2`}>
                            <PhoneIcon style={tw`text-blue-400`} />
                            <Text style={tw`text-xs text-white`}>+880122233344</Text>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <View style={tw`flex-row gap-4 my-6`}>
                    <StatCard value="156" label="Total Trips" />
                    <StatCard value="$390" label="Total Spent" />
                </View>

                {/* Menu */}
                <View>
                    {menuItems.map((item, index) => (
                        <ProfileMenuItem
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            hasToggle={item.hasToggle}
                            onToggle={item.onToggle}
                            toggleValue={item.toggleValue}
                            onPress={item.onPress}
                        />
                    ))}
                </View>

            </ScrollView>

            {/* Close Account Modal */}
            <ConfirmationModal
                visible={isCloseModalVisible}
                onClose={() => setCloseModalVisible(false)}
                title="Close Your Account?"
                message="Are you sure? Your account will be deleted and your remaining balance refunded to your original payment method."
                primaryButtonText="Close & Refund"
                onPrimaryButtonPress={() => { router.push('/(screens)/closeAndRefund'); setCloseModalVisible(false); }}
                secondaryButtonText="Cancel"
            >
                <View style={tw`bg-green-900/50 border border-green-700 rounded-lg py-3 items-center`}>
                    <Text style={tw`text-green-300 font-semibold`}>Refundable Balance: $8.50</Text>
                </View>
            </ConfirmationModal>

            {/* Logout Modal */}
            <ConfirmationModal
                visible={isLogoutModalVisible}
                onClose={() => setLogoutModalVisible(false)}
                title="Log Out?"
                message="Are you sure you want to log out?"
                primaryButtonText="Log Out"
                onPrimaryButtonPress={() => { router.push('/(authscreen)/login'); setLogoutModalVisible(false); }}
                secondaryButtonText="Cancel"
            />

        </SafeAreaView>
    );
}

export default Profile;
