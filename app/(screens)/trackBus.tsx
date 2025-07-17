import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';
import COLORS from '../constants/color';



const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const BusMarkerIcon = () => (
    <View style={tw`p-1 bg-red-500 rounded-full border-2 border-white shadow-lg`}>
        <Svg width="20" height="20" viewBox="0 0 24 24">
            <Path fill="white" d="M21.93 10.34c-.48-2.39-2.28-4.39-4.65-5.12l-2.33-2.33c-.4-.4-1.03-.4-1.43 0L12 4.44L10.48 2.9c-.4-.4-1.03-.4-1.43 0L6.72 5.22c-2.37.73-4.17 2.73-4.65 5.12H1v1.5c0 .83.67 1.5 1.5 1.5h1.5v4.5h2v-4.5h8v4.5h2v-4.5h1.5c.83 0 1.5-.67 1.5-1.5v-1.5h-1.07zM12 14c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </Svg>
    </View>
);

const UserLocationMarkerIcon = () => (
    <View style={tw`w-4 h-4 rounded-full bg-blue-500 border-2 border-white`} />
);


// --- Reusable Components --- //

const BusInfoCard = ({ bus, isSelected, onPress }: { bus: any; isSelected: boolean; onPress: () => void; }) => (
    <TouchableOpacity
        onPress={onPress}
        style={tw.style(
            `bg-[#1E1E1E] rounded-lg border-2 p-3`,
            isSelected ? 'border-blue-500' : 'border-gray-700'
        )}
    >
        <Text style={tw`text-white text-sm font-semibold`}>{bus.route}</Text>
        <View style={tw`flex-row justify-between mt-2`}>
            <View>
                <Text style={tw`text-gray-400 text-xs`}>Bus Number</Text>
                <Text style={tw`text-white text-base font-bold`}>{bus.number}</Text>
            </View>
            <View style={tw`items-end`}>
                <Text style={tw`text-gray-400 text-xs`}>Occupancy</Text>
                <Text style={tw`text-yellow-400 text-base font-bold`}>{bus.occupancy}</Text>
            </View>
        </View>
    </TouchableOpacity>
);


// --- Main Component --- //

const TrackBus = () => {
    const [selectedBus, setSelectedBus] = useState('bus1');
    const mapRef = useRef<MapView>(null);

    const buses = {
        bus1: {
            id: 'bus1',
            route: 'Route 12 - Airport to Dhanmondi',
            number: 'RX-101',
            occupancy: 'Medium',
            coords: { latitude: 23.777176, longitude: 90.399452 }, // Dhaka center
        },
        bus2: {
            id: 'bus2',
            route: 'Route 15 - Gulshan to Motijheel',
            number: 'RX-105',
            occupancy: 'Low',
            coords: { latitude: 23.7925, longitude: 90.4078 }, // Gulshan
        },
    };

    const routeCoordinates = [
        { latitude: 23.8759, longitude: 90.3792 }, // Airport
        { latitude: 23.8103, longitude: 90.4125 }, // Uttara
        { latitude: 23.7925, longitude: 90.4078 }, // Gulshan
        { latitude: 23.7563, longitude: 90.3884 }, // Dhanmondi
    ];

    const handleBusSelection = (busId: string) => {
        setSelectedBus(busId);
        const bus = buses[busId as keyof typeof buses];
        mapRef.current?.animateToRegion({
            ...bus.coords,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
        }, 1000);
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515]  `}>


            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Track bus</Text>
            </View>

            {/* Map View */}
            <View style={tw`flex-1 h-[40%] `}>
                <MapView

                    showsUserLocation
                    followsUserLocation
                    userInterfaceStyle="dark"
                    showsMyLocationButton
                    showsCompass
                    collapsable
                    ref={mapRef}
                    provider={Platform.OS === 'android' ? 'google' : undefined}
                    style={tw`flex-1`}
                    initialRegion={{
                        latitude: 23.8103,
                        longitude: 90.4125,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}

                >
                    <Polyline coordinates={routeCoordinates} strokeColor="#1976D2" strokeWidth={3} />
                    <Marker coordinate={{ latitude: 23.7461, longitude: 90.3742 }}>
                        <UserLocationMarkerIcon />
                    </Marker>

                    {Object.values(buses).map(bus => (
                        <Marker key={bus.id} coordinate={bus.coords} anchor={{ x: 0.5, y: 0.5 }}>
                            {selectedBus === bus.id && <BusMarkerIcon />}
                        </Marker>
                    ))}
                </MapView>
            </View>

            {/* Bottom Sheet Area */}
            <View style={tw`h-[500px] py-8 px-4`}>
                <ScrollView contentContainerStyle={tw`gap-4 mb-4`}>
                    {Object.values(buses).map(bus => (
                        <View key={bus.id} style={tw``}>
                            <BusInfoCard
                                bus={bus}
                                isSelected={selectedBus === bus.id}
                                onPress={() => handleBusSelection(bus.id)}
                            />
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity style={tw`bg-[${COLORS.primary}] rounded-lg py-2 items-center mb-8`}>
                    <Text style={tw`text-white font-semibold text-base`}>Notify me when bus arrives</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default TrackBus;
