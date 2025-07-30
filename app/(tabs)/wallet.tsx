
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';
import COLORS from '../constants/color';

// --- SVG Icon Components for React Native --- //

const WalletIcon = ({ style, width = 24, height = 24 }: any) => (
    <Svg width={width} height={height} viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.227.314.532.542.894.542s.667-.228.894-.542C7.92 6.644 8 6.253 8 6a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 13.5 2h-12z" />
        <Path fill="currentColor" d="M15 6.5v5.5A1.5 1.5 0 0 1 13.5 14h-12A1.5 1.5 0 0 1 0 12.5V6.5h15z" />
    </Svg>
);

const BusIcon = ({ style }: any) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M15 8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V8ZM1 8.5v5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8.5H1Z" />
        <Path fill="currentColor" d="M6 4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V6h-3V4.5ZM2 3h12v1H2V3Z" />
    </Svg>
);

const RefundIcon = ({ style }: any) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fillRule="evenodd" fill="currentColor" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z" />
        <Path fill="currentColor" d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
    </Svg>
);

const PlusCircleIcon = ({ style }: any) => (
    <Svg width="14" height="14" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <Path fill="currentColor" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
    </Svg>
);


export default function App() {
    const [activeFilter, setActiveFilter] = useState('All');

    const transactions = [
        { type: 'Trip', title: 'Trip Fare - Route 22', time: 'Today, 10:15 AM', amount: -30.00, icon: <BusIcon style={tw`text-white`} /> },
        { type: 'Top-Up', title: 'Wallet Top-Up', time: 'Today, 9:52 AM', amount: 100.00, icon: <WalletIcon style={tw`text-white`} width={20} height={20} /> },
        { type: 'Refund', title: 'Cancellation Refund', time: 'Yesterday, 3:20 PM', amount: 50.00, icon: <RefundIcon style={tw`text-white`} /> },
        { type: 'Trip', title: 'Trip Fare - Route 15', time: 'Yesterday, 9:00 AM', amount: -25.00, icon: <BusIcon style={tw`text-white`} /> },
    ];

    const filteredTransactions = transactions.filter(t => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Top-Ups') return t.type === 'Top-Up';
        if (activeFilter === 'Trips') return t.type === 'Trip';
        if (activeFilter === 'Refunds') return t.type === 'Refund';
        return false;
    });

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-12`}>


            {/* Header */}
            <View style={tw`py-3.5 items-center`}>
                <Text style={tw`text-lg font-semibold text-white`}>My Wallet</Text>
            </View>

            {/* Main Scrollable Content */}
            <ScrollView style={tw`flex-1`} contentContainerStyle={tw`px-5 pb-5 gap-5`}>
                {/* Balance Card */}
                <LinearGradient
                    colors={['#125495', '#65A3E1']}
                    style={tw`rounded-lg p-5 items-center`}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={tw`text-white text-sm font-normal opacity-90`}>Current Balance</Text>
                    <View>
                        <Text style={tw`text-3xl font-semibold text-[#35C77E] mt-1`}>$220.40</Text>
                    </View>
                </LinearGradient>

                {/* Top Up Button */}
                <TouchableOpacity onPress={() => router.push('/(screens)/AddTopup')} style={tw`flex-row justify-center items-center gap-2 bg-[${COLORS.primary}] rounded-md py-3`}>

                    <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '600', lineHeight: 15.40, wordWrap: 'break-word' }}> + Top Up</Text>
                </TouchableOpacity>

                {/* Recent Activity Section */}
                <View style={tw`gap-4`}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-white text-base font-semibold`}>Recent Activity</Text>
                        <View style={tw`flex-row items-center bg-[#1E1E1E] rounded-md border border-[#686868]/50 p-1`}>
                            {['All', 'Top-Ups', 'Trips', 'Refunds'].map(filter => (
                                <TouchableOpacity
                                    key={filter}
                                    style={tw.style(`py-1 px-3 rounded-md`, activeFilter === filter && `bg-[${COLORS.primary}]`)}
                                    onPress={() => setActiveFilter(filter)}
                                >
                                    <Text style={tw`text-white text-xs font-normal`}>{filter}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Transaction List */}
                    <View style={tw`gap-2.5`}>
                        {filteredTransactions.map((item, index) => (
                            <View key={index} style={tw`flex-row items-center gap-3 bg-[#1E1E1E] rounded-lg border border-[#4B4B4B] p-3`}>
                                <View style={tw`w-10 h-10 rounded-full bg-[#1976D2] justify-center items-center`}>
                                    {item.icon}
                                </View>
                                <View style={tw`flex-1`}>
                                    <Text style={tw`text-white text-base font-semibold`}>{item.title}</Text>
                                    <Text style={tw`text-xs font-normal text-gray-400 mt-1`}>{item.time}</Text>
                                </View>
                                <Text style={tw.style(`text-xs font-semibold`, item.amount > 0 ? `text-[#3FB228]` : `text-[#E94444]`)}>
                                    {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
