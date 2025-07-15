import tw from '@/assets/lib/tailwind';
import { Feather, FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const alerts = [
    {
        title: 'Route 2 Delayed',
        message: 'Due to road construction, Route 2 is experiencing 15-minute delays.',
        time: '2 hours ago',
        type: 'warning',
    },
    {
        title: 'New Payment Options',
        message: 'You can now pay via mobile wallet.',
        time: '2 hours ago',
        type: 'info',
    },
    {
        title: 'Holiday Schedule',
        message: 'Buses will run on a holiday schedule this weekend.',
        time: '2 hours ago',
        type: 'info',
    },
];

export default function Home() {
    return (
        <ScrollView style={tw`flex-1 bg-[#151515] px-4 pt-12`}>
            <StatusBar barStyle={'light-content'} />
            {/* Header */}
            <View style={tw`flex-row items-center mb-5`}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
                    style={tw`w-12 h-12 rounded-full`}
                />
                <View style={tw`ml-3`}>
                    <Text style={tw`text-white text-xl font-bold`}>Hi Liam 👋</Text>
                    <Text style={tw`text-gray-400`}>@liam_123</Text>
                </View>
            </View>

            {/* Balance Card */}
            <View style={tw`flex-row bg-white rounded-xl overflow-hidden mb-6`}>
                <View style={tw`bg-[#125495] w-2/4 justify-center px-4 py-6`}>
                    <Text style={tw`text-white text-[27px] font-semibold`}>Balance</Text>
                    <Text style={tw`text-red-500 text-[27px] font-semibold mb-2`}>-$ 7.00</Text>
                    <TouchableOpacity style={tw`border w-[118px] border-white p-1 rounded-md flex flex-row items-center justify-center`}>
                        <Text style={tw`text-white text-base`}>+ Top Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`flex-1 items-center justify-center`}>
                    <Image
                        source={require('../../assets/images/barCode.png')} // ✅ Replace with your barcode image

                        resizeMode="stretch"
                    />
                </View>
            </View>

            {/* Quick Actions */}
            <View style={tw`flex-row justify-between mb-6`}>
                <View style={tw`w-[30%] bg-gray-900 p-3 rounded-xl items-center`}>
                    <Feather name="clock" size={24} color="white" />
                    <Text style={tw`text-white text-sm mt-2`}>Trip History</Text>
                </View>
                <View style={tw`w-[30%] bg-gray-900 p-3 rounded-xl items-center`}>
                    <Feather name="map-pin" size={24} color="white" />
                    <Text style={tw`text-white text-sm mt-2`}>Track Bus</Text>
                </View>
                <View style={tw`w-[30%] bg-gray-900 p-3 rounded-xl items-center`}>
                    <Feather name="phone" size={24} color="white" />
                    <Text style={tw`text-white text-sm mt-2`}>Contact</Text>
                </View>
            </View>

            {/* Recent Alerts */}
            <Text style={tw`text-white text-lg font-semibold mb-3`}>Recent Alerts</Text>
            <View style={tw`gap-3 pb-12`}>
                {alerts.map((alert, index) => (
                    <View key={index} style={tw`bg-gray-900 p-4 rounded-xl`}>
                        <View style={tw`flex-row items-center mb-2`}>
                            {alert.type === 'warning' ? (
                                <FontAwesome name="warning" size={18} color="orange" />
                            ) : (
                                <Feather name="info" size={18} color="#3b82f6" />
                            )}
                            <Text style={tw`text-white font-semibold ml-2`}>{alert.title}</Text>
                        </View>
                        <Text style={tw`text-gray-300 text-sm`}>{alert.message}</Text>
                        <Text style={tw`text-gray-500 text-xs mt-1`}>{alert.time}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}
