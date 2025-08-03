import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const RouteIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M21.93 10.34c-.48-2.39-2.28-4.39-4.65-5.12l-2.33-2.33c-.4-.4-1.03-.4-1.43 0L12 4.44L10.48 2.9c-.4-.4-1.03-.4-1.43 0L6.72 5.22c-2.37.73-4.17 2.73-4.65 5.12H1v1.5c0 .83.67 1.5 1.5 1.5h1.5v4.5h2v-4.5h8v4.5h2v-4.5h1.5c.83 0 1.5-.67 1.5-1.5v-1.5h-1.07zM12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    </Svg>
);

const PaymentIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
    </Svg>
);


// --- Reusable Components --- //

const FilterButton = ({ label, active, onPress }: { label: string; active: boolean; onPress: () => void; }) => (
    <TouchableOpacity
        onPress={onPress}
        style={tw.style(
            `px-3 py-2 rounded-md border`,
            active ? 'bg-white/10 border-white/30' : 'bg-[#1E1E1E] border-gray-600'
        )}
    >
        <Text style={tw`text-white text-sm font-medium`}>{label}</Text>
    </TouchableOpacity>
);

const TripCard = ({ trip }: { trip: any }) => {
    const statusStyles: { [key: string]: { container: string; text: string } } = {
        Completed: { container: 'bg-green-900/60', text: 'text-green-400' },
        Refunded: { container: 'bg-yellow-900/60', text: 'text-yellow-400' },
        Cancelled: { container: 'bg-red-900/60', text: 'text-red-400' },
    };

    const currentStatusStyle = statusStyles[trip.status] || { container: 'bg-gray-700', text: 'text-gray-300' };

    return (
        <View style={tw`bg-[#1E1E1E] rounded-lg border border-[#4B4B4B] p-4`}>
            <View style={tw`flex-row justify-between items-start mb-4`}>
                <Text style={tw`text-white text-base font-semibold`}>{trip.date}</Text>
                <View style={tw.style(`px-2.5 py-1 rounded-full`, currentStatusStyle.container)}>
                    <Text style={tw.style(`text-sm font-semibold`, currentStatusStyle.text)}>{trip.status}</Text>
                </View>
            </View>
            <View style={tw`flex-row justify-between items-end`}>
                <View style={tw`gap-2`}>
                    <View style={tw`flex-row items-center gap-3`}>
                        <RouteIcon style={tw`text-blue-400`} />
                        <Text style={tw`text-gray-300 text-sm`}>{trip.route}</Text>
                    </View>
                    <View style={tw`flex-row items-center gap-3`}>
                        <PaymentIcon style={tw`text-blue-400`} />
                        <Text style={tw`text-gray-300 text-sm`}>{trip.paymentMethod}</Text>
                    </View>
                </View>
                <Text style={tw`text-green-400 text-lg font-bold`}>${trip.amount.toFixed(2)}</Text>
            </View>
        </View>
    );
};

// --- Main Component --- //

const TripHistory = () => {
    const [activeFilter, setActiveFilter] = useState('All Trips');

    const allTrips = [
        { date: 'June 22, 2025 - 08:15 AM', status: 'Completed', route: 'Route 15 - Gulshan to Motijheel', paymentMethod: 'Stripe', amount: 30.00 },
        { date: 'June 21, 2025 - 10:30 AM', status: 'Completed', route: 'Route 22 - North Rolleston', paymentMethod: 'Wallet', amount: 3.50 },
        { date: 'June 20, 2025 - 05:00 PM', status: 'Refunded', route: 'Route 15 - Gulshan to Motijheel', paymentMethod: 'Stripe', amount: 30.00 },
        { date: 'June 19, 2025 - 09:00 AM', status: 'Cancelled', route: 'Route 22 - North Rolleston', paymentMethod: 'Wallet', amount: 3.50 },
        { date: 'May 30, 2025 - 07:45 AM', status: 'Completed', route: 'Route 15 - Gulshan to Motijheel', paymentMethod: 'Stripe', amount: 30.00 },
    ];

    const filteredTrips = allTrips.filter(trip => {
        if (activeFilter === 'All Trips') return true;
        if (activeFilter === 'This Month') {
            // Simple logic for demonstration. In a real app, you'd use a date library.
            return new Date(trip.date.split(' - ')[0]).getMonth() === 5; // June is month 5
        }
        return trip.status === activeFilter;
    });

    const filters = ['All Trips', 'This Month', 'Completed', 'Refunded', 'Cancelled'];

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-6`}>


            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Trip History</Text>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                {/* Balance Card */}
                <LinearGradient
                    colors={['#125495', '#65A3E1']}
                    style={tw`rounded-lg p-5 items-center my-4`}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <Text style={tw`text-white text-sm font-normal opacity-90`}>Current Balance</Text>
                    <Text style={tw`text-3xl font-semibold text-[#35C77E] mt-1`}>$220.40</Text>
                </LinearGradient>

                {/* Filters */}
                <View style={tw`mb-5`}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View style={tw`flex-row gap-3`}>
                            {filters.map(filter => (
                                <FilterButton
                                    key={filter}
                                    label={filter}
                                    active={activeFilter === filter}
                                    onPress={() => setActiveFilter(filter)}
                                />
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Trip List */}
                <View style={tw`gap-4`}>
                    {filteredTrips.map((trip, index) => (
                        <TripCard key={index} trip={trip} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default TripHistory;
