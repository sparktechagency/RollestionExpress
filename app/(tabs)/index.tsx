import tw from '@/assets/lib/tailwind';
import React from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import AlertCard from '../components/ui/AlertCard';
import BallanceCard from '../components/ui/BallanceCard';
import Header from '../components/ui/Header';
import QuickAction from '../components/ui/QuickAction';
import COLORS from '../constants/color';
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
        <ScrollView style={tw`flex-1 bg-[${COLORS.backgroundcolor}] px-4 pt-12 `}>
            <StatusBar barStyle={'light-content'} />

            <Header />
            {/* Balance Card */}
            <BallanceCard />

            {/* Quick Actions */}
            <QuickAction />

            {/* Recent Alerts */}
            <Text style={tw`text-white text-lg font-semibold mb-3`}>Recent Alerts</Text>
            <View style={tw`gap-3 pb-16`}>
                {alerts.map((alert, index) => (
                    <AlertCard key={index} alert={
                        {
                            title: alert.title,
                            message: alert.message,
                            time: alert.time,
                            type: alert.type
                        }
                    } />
                ))}
            </View>

        </ScrollView>
    );
}
