import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

// --- SVG Icon Components --- //

const InfoIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </Svg>
);

const MapPinIcon = ({ style }: { style?: any }) => (
    <Svg width="14" height="14" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
    </Svg>
);

const ClockIcon = ({ style }: { style?: any }) => (
    <Svg width="14" height="14" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
        <Path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
    </Svg>
);

const ChevronRightIcon = ({ style }: { style?: any }) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" style={style}>
        <Path fillRule="evenodd" fill="currentColor" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
    </Svg>
);


// --- Reusable Components --- //

const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => (
    <TouchableOpacity
        style={tw.style(`w-14 h-7 rounded-full justify-center`, value ? 'bg-blue-500' : 'bg-gray-500')}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.8}
    >
        <View style={tw.style(`w-6 h-6 rounded-full`, value ? 'bg-white' : 'bg-gray-300')} />
    </TouchableOpacity>
);

const InfoTag = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
    <View style={tw`flex-row items-center gap-1 bg-white/20 rounded-lg px-2 py-1`}>
        {icon}
        <Text style={tw`text-white text-xs font-semibold`}>{text}</Text>
    </View>
);

const RouteCard = ({ route, active }: { route: any; active: boolean }) => (
    <View style={tw`bg-[#1E1E1E] rounded-lg border border-[#686868] p-4 gap-3`}>
        <Text style={tw`text-white text-base font-semibold`}>{route.name}</Text>
        <Text style={tw`text-white text-sm font-normal`}>{route.location}</Text>
        <View style={tw`gap-2.5`}>
            <View style={tw`flex-row flex-wrap gap-1.5`}>
                <InfoTag icon={<MapPinIcon style={tw`text-white`} />} text={`${route.outbound} Outbound`} />
                <InfoTag icon={<MapPinIcon style={tw`text-white`} />} text={`${route.inbound} Inbound`} />
            </View>
            <InfoTag icon={<ClockIcon style={tw`text-white`} />} text={route.time} />
        </View>
        <Text style={tw`text-white text-xs font-normal`}>First trip: {route.firstTrip} | Last trip: {route.lastTrip}</Text>
        <TouchableOpacity onPress={() => router.push('/(screens)/routeDetails')} style={tw.style(`flex-row justify-center items-center h-9 rounded-md border-2`, active ? 'border-[#1976D2]' : 'border-[#686868]')}>
            <Text style={tw.style(`text-white text-sm font-semibold`, active ? 'text-[#1976D2]' : 'text-[#686868]')}>View Route</Text>
            <ChevronRightIcon style={tw`ml-2 text-white`} />
        </TouchableOpacity>
    </View>
);

// --- Main Component --- //

const Routes = () => {
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    const routeData = [
        { name: 'RX1', location: 'North Rolleston', outbound: 6, inbound: 6, time: '5:53 AM - 8:00 AM', firstTrip: '5:53 AM', lastTrip: '8:00 AM', active: true },
        { name: 'RX2', location: 'South Rolleston', outbound: 6, inbound: 6, time: '6:00 AM - 8:30 AM', firstTrip: '6:00 AM', lastTrip: '8:30 AM', active: false },
    ];

    const filteredRoutes = showActiveOnly ? routeData.filter(r => r.active) : routeData;

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] `}>


            {/* Header */}
            <View style={tw`py-4 items-center`}>
                <Text style={tw`text-lg font-semibold text-white`}>Routes</Text>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                {/* Info Banner */}
                <View style={tw`flex-row items-center gap-2.5 mb-5`}>
                    <InfoIcon style={tw`text-[#1976D2]`} />
                    <Text style={tw`text-white text-xs font-normal flex-1`}>RX Rolleston has 2 convenient routes that run Monday to Friday</Text>
                </View>

                {/* Toggle */}
                <View style={tw`flex-row justify-between items-center mb-5`}>
                    <Text style={tw`text-white text-base font-normal`}>Show active routes only</Text>
                    <ToggleSwitch value={showActiveOnly} onValueChange={setShowActiveOnly} />
                </View>

                {/* Route Cards */}
                <View style={tw`gap-4`}>
                    {filteredRoutes.map((route) => (
                        <RouteCard key={route.name} route={route} active={route.active} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Routes;
