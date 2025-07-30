// import { router } from 'expo-router';
// import React from 'react';
// import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import Svg, { Path } from 'react-native-svg';
// import tw from 'twrnc';

// // --- SVG Icon Components --- //

// const ChevronLeftIcon = ({ style }: { style?: any }) => (
//     <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
//         <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
//     </Svg>
// );

// const BusIcon = ({ style }: { style?: any }) => (
//     <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
//         <Path fill="currentColor" d="M15 8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V8ZM1 8.5v5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8.5H1Z" />
//         <Path fill="currentColor" d="M6 4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V6h-3V4.5ZM2 3h12v1H2V3Z" />
//     </Svg>
// );

// const UserIcon = ({ style }: { style?: any }) => (
//     <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
//         <Path fill="currentColor" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
//     </Svg>
// );

// const ChildIcon = ({ style }: { style?: any }) => (
//     <Svg width="16" height="16" viewBox="0 0 16 16" style={style}>
//         <Path fill="currentColor" d="M10 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM6 6a1 1 0 0 0-1 1v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V7a1 1 0 0 0-1-1h-1zm4 0a1 1 0 0 0-1 1v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V7a1 1 0 0 0-1-1h-1zM3 9.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
//     </Svg>
// );

// const FamilyIcon = ({ style }: { style?: any }) => (
//     <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
//         <Path fill="currentColor" d="M3.5 11.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm.293-3.293a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zM11.5 5.5a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zM8 1.5A2.5 2.5 0 1 0 5.5 4 2.5 2.5 0 0 0 8 1.5z" />
//     </Svg>
// );

// // --- Reusable Components --- //

// const FareTypeRow = ({ icon, label, price }: { icon: React.ReactNode; label: string; price: string }) => (
//     <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-700`}>
//         <View style={tw`flex-row items-center gap-4`}>
//             <View style={tw`w-5 h-5`}>{icon}</View>
//             <Text style={tw`text-white text-sm font-semibold`}>{label}</Text>
//         </View>
//         <Text style={tw`text-green-500 text-sm font-semibold`}>{price}</Text>
//     </View>
// );

// const TimePill = ({ time }: { time: string }) => (
//     <View style={tw`px-3 py-2 rounded-md border border-gray-600`}>
//         <Text style={tw`text-white font-semibold text-sm`}>{time}</Text>
//     </View>
// );

// const StopSchedule = ({ stop, times }: { stop: string; times: string[] }) => (
//     <View style={tw`mb-4 flex flex-row items-center gap-2  `}>
//         <Text style={tw`text-white text-xs font-semibold mb-2 w-[25%]`}>{stop}</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             <View style={tw`flex-row gap-2`}>
//                 {times.map((time, index) => <TimePill key={index} time={time} />)}
//             </View>
//         </ScrollView>
//     </View>
// );

// // --- Main Component --- //

// const RouteDetails = () => {
//     // Data for the map and schedule
//     const initialRegion = {
//         latitude: -43.5321, // Christchurch
//         longitude: 172.6362,
//         latitudeDelta: 0.15,
//         longitudeDelta: 0.15,
//     };

//     const routeCoordinates = [
//         { latitude: -43.578, longitude: 172.486 }, // Rolleston
//         { latitude: -43.56, longitude: 172.55 },
//         { latitude: -43.54, longitude: 172.60 },
//         { latitude: -43.5321, longitude: 172.6362 }, // City Center
//     ];

//     const amSchedule = {
//         'Oak Tree Lane': ['5:53', '6:25', '6:55', '7:15', '7:40', '8:00'],
//         'Kidman St': ['5:58', '6:30', '7:00', '7:20', '7:45', '8:05'],
//         'Hospital': ['6:10', '6:42', '7:12', '7:32', '7:57', '8:17'],
//         'Bus Interchange': ['6:15', '6:47', '7:17', '7:37', '8:02', '8:22'],
//         'Ara Institute': ['6:20', '6:52', '7:22', '7:42', '8:07', '8:27'],
//     };
// const pmSchedule = amSchedule;
//     return (
//         <SafeAreaView style={tw`flex-1 bg-[#151515] pt-12`}>


//             {/* Header */}
//             <View style={tw`flex-row items-center p-4`}>
//                 <TouchableOpacity onPress={() => router.back()}>
//                     <ChevronLeftIcon style={tw`text-white`} />
//                 </TouchableOpacity>
//                 <Text style={tw`text-lg font-semibold text-white ml-3`}>Details</Text>
//             </View>

//             <ScrollView contentContainerStyle={tw`pb-10`}>
//                 {/* Route Info */}
//                 <View style={tw`px-5 mb-4`}>
//                     <Text style={tw`text-white text-base font-semibold text-center`}>RX1 Rolleston To Christchurch Express</Text>
//                     <Text style={tw`text-gray-300 text-sm font-normal text-center mt-1`}>via Oak Tree Lane, Rolleston, Hospital & Ara Institute</Text>
//                 </View>

//                 {/* Map View */}
//                 <View style={tw`h-60`}>
//                     <MapView style={tw`flex-1`} initialRegion={initialRegion} provider="google">
//                         <Polyline coordinates={routeCoordinates} strokeColor="#1976D2" strokeWidth={4} />
//                         <Marker coordinate={{ latitude: -43.578, longitude: 172.486 }} title="Rolleston" pinColor="#1976D2" />
//                         <Marker coordinate={{ latitude: -43.5321, longitude: 172.6362 }} title="City Center" pinColor="red" />
//                     </MapView>
//                 </View>

//                 {/* Fare Types */}
//                 <View style={tw`mx-5 mt-6`}>
//                     <Text style={tw`text-white text-sm font-semibold mb-2`}>Fare Type for this Trip</Text>
//                     <View style={tw`bg-[#1E1E1E] rounded-lg`}>
//                         <FareTypeRow icon={<UserIcon style={tw`text-[#1976D2]`} />} label="Adult" price="$3.50" />
//                         <FareTypeRow icon={<ChildIcon style={tw`text-[#1976D2]`} />} label="Child" price="$1.50" />
//                         <FareTypeRow icon={<FamilyIcon style={tw`text-[#1976D2]`} />} label="Family Pass" price="$8.00" />
//                         <View style={tw`flex-row items-center p-4`}>
//                             <Text style={tw`text-gray-400 text-xs`}>Need a Family Pass? </Text>
//                             <TouchableOpacity>
//                                 <Text style={tw`text-[#1976D2] text-xs font-semibold`}>Purchase Now</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Timetable - AM */}
//                 <View style={tw`mx-5 mt-6`}>
//                     <View style={tw`flex-row items-center gap-2 mb-4`}>
//                         <BusIcon style={tw`text-[#1976D2]`} />
//                         <Text style={tw`text-white text-sm font-semibold`}>Rolleston North To City - AM</Text>
//                     </View>
//                     {Object.entries(amSchedule).map(([stop, times]) => (
//                         <StopSchedule key={stop} stop={stop} times={times} />
//                     ))}
//                 </View>
//                 {/* Timetable - PM */}
//                 <View style={tw`mx-5 mt-6`}>
//                     <View style={tw`flex-row items-center gap-2 mb-4`}>
//                         <BusIcon style={tw`text-[#1976D2]`} />
//                         <Text style={tw`text-white text-sm font-semibold`}>Rolleston North To City - PM</Text>
//                     </View>
//                     {Object.entries(amSchedule).map(([stop, times]) => (
//                         <StopSchedule key={stop} stop={stop} times={times} />
//                     ))}
//                 </View>

//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// export default RouteDetails;


import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const BusIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M15 8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v5.5a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5V8ZM1 8.5v5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8.5H1Z" />
        <Path fill="currentColor" d="M6 4.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V6h-3V4.5ZM2 3h12v1H2V3Z" />
    </Svg>
);

const UserIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </Svg>
);

const ChildIcon = ({ style }: { style?: any }) => (
    <Svg width="16" height="16" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M10 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0zM6 6a1 1 0 0 0-1 1v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V7a1 1 0 0 0-1-1h-1zm4 0a1 1 0 0 0-1 1v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V7a1 1 0 0 0-1-1h-1zM3 9.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
    </Svg>
);

const FamilyIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M3.5 11.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5zm.293-3.293a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zM11.5 5.5a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414zM8 1.5A2.5 2.5 0 1 0 5.5 4 2.5 2.5 0 0 0 8 1.5z" />
    </Svg>
);

// --- Reusable Components --- //

const FareTypeRow = ({ icon, label, price }: { icon: React.ReactNode; label: string; price: string }) => (
    <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray-700`}>
        <View style={tw`flex-row items-center gap-4`}>
            <View style={tw`w-5 h-5`}>{icon}</View>
            <Text style={tw`text-white text-sm font-semibold`}>{label}</Text>
        </View>
        <Text style={tw`text-green-500 text-sm font-semibold`}>{price}</Text>
    </View>
);

const TimePill = ({ time }: { time: string }) => (
    <View style={tw`px-3 py-2 rounded-md border border-gray-600`}>
        <Text style={tw`text-white font-semibold text-sm`}>{time}</Text>
    </View>
);


// --- Main Component --- //

const RouteDetails = () => {
    // Data for the map and schedule
    const initialRegion = {
        latitude: -43.5321, // Christchurch
        longitude: 172.6362,
        latitudeDelta: 0.15,
        longitudeDelta: 0.15,
    };

    const routeCoordinates = [
        { latitude: -43.578, longitude: 172.486 }, // Rolleston
        { latitude: -43.56, longitude: 172.55 },
        { latitude: -43.54, longitude: 172.60 },
        { latitude: -43.5321, longitude: 172.6362 }, // City Center
    ];

    const amSchedule = {
        'Oak Tree Lane': ['5:53', '6:25', '6:55', '7:15', '7:40', '8:00'],
        'Kidman St': ['5:58', '6:30', '7:00', '7:20', '7:45', '8:05'],
        'Hospital': ['6:10', '6:42', '7:12', '7:32', '7:57', '8:17'],
        'Bus Interchange': ['6:15', '6:47', '7:17', '7:37', '8:02', '8:22'],
        'Ara Institute': ['6:20', '6:52', '7:22', '7:42', '8:07', '8:27'],
    };

    // NOTE: You would have different data for PM, but we'll reuse AM for this example
    const pmSchedule = amSchedule;

    // A reusable timetable component to avoid duplicating code for AM/PM schedules
    const Timetable = ({ title, schedule }: { title: string; schedule: Record<string, string[]> }) => (
        <View style={tw`mx-5 mt-6`}>
            <View style={tw`flex-row items-center gap-2 mb-4`}>
                <BusIcon style={tw`text-[#1976D2]`} />
                <Text style={tw`text-white text-sm font-semibold`}>{title}</Text>
            </View>

            <View style={tw`flex-row`}>
                {/* --- Fixed Column for Stop Names --- */}
                <View style={tw`w-[28%]`}>
                    {Object.keys(schedule).map(stop => (
                        <View key={stop} style={tw`h-10 mb-2 justify-center`}>
                            <Text style={tw`text-white text-xs font-semibold`}>{stop}</Text>
                        </View>
                    ))}
                </View>

                {/* --- Single Horizontal ScrollView for all Times --- */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`flex-1`}>
                    <View>
                        {Object.values(schedule).map((times, index) => (
                            <View key={index} style={tw`flex-row gap-2 h-10 mb-2 items-center`}>
                                {times.map((time, timeIndex) => <TimePill key={timeIndex} time={time} />)}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );


    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-12`}>
            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Details</Text>
            </View>

            <ScrollView contentContainerStyle={tw`pb-10`}>
                {/* Route Info */}
                <View style={tw`px-5 mb-4`}>
                    <Text style={tw`text-white text-base font-semibold text-center`}>RX1 Rolleston To Christchurch Express</Text>
                    <Text style={tw`text-gray-300 text-sm font-normal text-center mt-1`}>via Oak Tree Lane, Rolleston, Hospital & Ara Institute</Text>
                </View>

                {/* Map View */}
                <View style={tw`h-60`}>
                    <MapView style={tw`flex-1`} initialRegion={initialRegion} provider="google">
                        <Polyline coordinates={routeCoordinates} strokeColor="#1976D2" strokeWidth={4} />
                        <Marker coordinate={{ latitude: -43.578, longitude: 172.486 }} title="Rolleston" pinColor="#1976D2" />
                        <Marker coordinate={{ latitude: -43.5321, longitude: 172.6362 }} title="City Center" pinColor="red" />
                    </MapView>
                </View>

                {/* Fare Types */}
                <View style={tw`mx-5 mt-6`}>
                    <Text style={tw`text-white text-sm font-semibold mb-2`}>Fare Type for this Trip</Text>
                    <View style={tw`bg-[#1E1E1E] rounded-lg`}>
                        <FareTypeRow icon={<UserIcon style={tw`text-[#1976D2]`} />} label="Adult" price="$3.50" />
                        <FareTypeRow icon={<ChildIcon style={tw`text-[#1976D2]`} />} label="Child" price="$1.50" />
                        <FareTypeRow icon={<FamilyIcon style={tw`text-[#1976D2]`} />} label="Family Pass" price="$8.00" />
                        <View style={tw`flex-row items-center p-4`}>
                            <Text style={tw`text-gray-400 text-xs`}>Need a Family Pass? </Text>
                            <TouchableOpacity>
                                <Text style={tw`text-[#1976D2] text-xs font-semibold`}>Purchase Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Timetables */}
                <Timetable title="Rolleston North To City - AM" schedule={amSchedule} />
                <Timetable title="Rolleston North To City - PM" schedule={pmSchedule} />

            </ScrollView>
        </SafeAreaView>
    );
}

export default RouteDetails;