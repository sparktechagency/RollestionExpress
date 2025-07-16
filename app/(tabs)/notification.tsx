
import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, UIManager, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- SVG Icon Components --- //

const BellIcon = ({ style }: { style?: any }) => (
    <Svg width="28" height="28" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
    </Svg>
);

const RouteBusIcon = ({ style, color }: { style?: any, color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill={color} d="M21 11.5c0-1.81-3.72-5.08-8.89-5.43l1.5-1.5c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0L10 5.41L7.81 3.17a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l1.5 1.5C3.72 6.42 0 9.69 0 11.5V18h2v-1.5c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5V18h8v-1.5c0-.83.67-1.5 1.5-1.5h1c.83 0 1.5.67 1.5 1.5V18h2v-6.5zM3.5 13c-.83 0-1.5.67-1.5 1.5V16H3v-1.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V16h1v-1.5c0-.83-.67-1.5-1.5-1.5h-1zm10 0c-.83 0-1.5.67-1.5 1.5V16h1v-1.5c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5V16h1v-1.5c0-.83-.67-1.5-1.5-1.5h-1z" />
    </Svg>
);

const ChevronUpIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fillRule="evenodd" fill="currentColor" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
    </Svg>
);

const ChevronDownIcon = ({ style }: { style?: any }) => (
    <Svg width="20" height="20" viewBox="0 0 16 16" style={style}>
        <Path fillRule="evenodd" fill="currentColor" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
    </Svg>
);

const InfoIcon = ({ style }: { style?: any }) => (
    <Svg width="18" height="18" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </Svg>
);

const ClockIcon = ({ style }: { style?: any }) => (
    <Svg width="13" height="13" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
        <Path fill="currentColor" d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
    </Svg>
);

const WarningIcon = ({ style }: { style?: any }) => (
    <Svg width="18" height="18" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </Svg>
);



// --- Reusable Components --- //

const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => (
    <TouchableOpacity
        style={tw.style(`w-10 h-5 rounded-full justify-center`, value ? 'bg-green-500' : 'bg-gray-600')}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.8}
    >
        <View style={tw.style(`w-[18px] h-[18px] bg-white rounded-full shadow`, value ? `self-end mr-1` : `self-start ml-1`)} />
    </TouchableOpacity>
);

const DepartureToggle = ({ time, isEnabled, onToggle }: { time: string; isEnabled: boolean; onToggle: () => void }) => (
    <View style={tw`flex-1 min-w-[32%]`}>
        <View style={tw`flex-row items-center justify-between bg-[#1E1E1E] border border-gray-700 rounded-md p-2`}>
            <Text style={tw`text-white text-sm`}>{time}</Text>
            <ToggleSwitch value={isEnabled} onValueChange={onToggle} />
        </View>
    </View>
);

const RouteAlertsSection = ({ route, allAlertsEnabled }: { route: any; allAlertsEnabled: boolean; }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [allRouteAlerts, setAllRouteAlerts] = useState(route.alertsEnabled);
    const [departures, setDepartures] = useState(route.departures);

    useEffect(() => {
        setAllRouteAlerts(allAlertsEnabled);
        setDepartures(departures.map((d: any) => ({ ...d, isEnabled: allAlertsEnabled })));
    }, [allAlertsEnabled]);

    const toggleExpansion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    const handleAllRouteAlertsToggle = (value: boolean) => {
        setAllRouteAlerts(value);
        setDepartures(departures.map((d: any) => ({ ...d, isEnabled: value })));
    };

    const handleDepartureToggle = (time: string) => {
        const newDepartures = departures.map((d: any) =>
            d.time === time ? { ...d, isEnabled: !d.isEnabled } : d
        );
        setDepartures(newDepartures);
        if (newDepartures.every((d: any) => d.isEnabled)) {
            setAllRouteAlerts(true);
        } else {
            setAllRouteAlerts(false);
        }
    };

    return (
        <View style={tw`bg-[#1E1E1E] rounded-lg border border-[#4B4B4B]`}>
            <TouchableOpacity onPress={toggleExpansion} style={tw`flex-row items-center p-3`}>
                <View style={tw`w-8 h-8 rounded-full bg-gray-500 justify-center items-center`}>
                    <RouteBusIcon color={route.color} />
                </View>
                <View style={tw`flex-1 mx-3`}>
                    <Text style={tw`text-white text-sm font-semibold`}>{route.title}</Text>
                    <Text style={tw`text-gray-400 text-xs mt-1`}>{route.subtitle}</Text>
                </View>
                {isExpanded ? <ChevronUpIcon style={tw`text-white`} /> : <ChevronDownIcon style={tw`text-white`} />}
            </TouchableOpacity>

            {isExpanded && (
                <View style={tw`p-4 border-t border-gray-700`}>
                    <View style={tw`flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-gray-300 text-sm`}>Enable all route alerts below</Text>
                        <ToggleSwitch value={allRouteAlerts} onValueChange={handleAllRouteAlertsToggle} />
                    </View>

                    <Text style={tw`text-white font-semibold mb-2`}>Morning Departures</Text>
                    <View style={tw`flex-row flex-wrap gap-2 mb-4`}>
                        {departures.slice(0, 6).map((dep: any) => (
                            <DepartureToggle key={dep.time} time={dep.time} isEnabled={dep.isEnabled} onToggle={() => handleDepartureToggle(dep.time)} />
                        ))}
                    </View>

                    <Text style={tw`text-white font-semibold mb-2`}>Evening Departures</Text>
                    <View style={tw`flex-row flex-wrap gap-2`}>
                        {departures.slice(6).map((dep: any) => (
                            <DepartureToggle key={dep.time} time={dep.time} isEnabled={dep.isEnabled} onToggle={() => handleDepartureToggle(dep.time)} />
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
};

const RecentAlertCard = ({ icon, title, body, time, iconBgColor }: { icon: React.ReactNode; title: string; body: string; time: string; iconBgColor: string }) => (
    <View style={tw`bg-[#1E1E1E] rounded-lg border border-[#686868] p-3`}>
        <View style={tw`flex-row items-start gap-3`}>
            <View style={tw.style(`w-6 h-6 rounded-full justify-center items-center`, iconBgColor)}>
                {icon}
            </View>
            <View style={tw`flex-1`}>
                <Text style={tw`text-white text-base font-semibold`}>{title}</Text>
                <Text style={tw`text-gray-300 text-xs mt-1`}>{body}</Text>
                <View style={tw`flex-row items-center gap-1.5 mt-2`}>
                    <ClockIcon style={tw`text-gray-400`} />
                    <Text style={tw`text-gray-400 text-[10px]`}>{time}</Text>
                </View>
            </View>
        </View>
    </View>
);

// --- Main Component --- //

const Notification = () => {
    const [allAlerts, setAllAlerts] = useState(false);

    const routes = [
        {
            title: 'RX1 All Alerts',
            subtitle: 'Rolleston to Christchurch Express',
            color: '#45C367',
            alertsEnabled: true,
            departures: [
                { time: '5:53 AM', isEnabled: true }, { time: '6:25 AM', isEnabled: true }, { time: '6:55 AM', isEnabled: true },
                { time: '7:15 AM', isEnabled: true }, { time: '7:40 AM', isEnabled: true }, { time: '8:00 AM', isEnabled: true },
                { time: '4:30 PM', isEnabled: true }, { time: '5:00 PM', isEnabled: true }, { time: '5:30 PM', isEnabled: true },
                { time: '6:00 PM', isEnabled: true }, { time: '6:30 PM', isEnabled: true }, { time: '7:00 PM', isEnabled: true },
            ],
        },
        {
            title: 'RX2 All Alerts',
            subtitle: 'Rolleston to Christchurch Express',
            color: '#BAAE21',
            alertsEnabled: false,
            departures: [
                { time: '5:53 AM', isEnabled: false }, { time: '6:25 AM', isEnabled: false }, { time: '6:55 AM', isEnabled: false },
                { time: '7:15 AM', isEnabled: false }, { time: '7:40 AM', isEnabled: false }, { time: '8:00 AM', isEnabled: false },
                { time: '4:30 PM', isEnabled: false }, { time: '5:00 PM', isEnabled: false }, { time: '5:30 PM', isEnabled: false },
                { time: '6:00 PM', isEnabled: false }, { time: '6:30 PM', isEnabled: false }, { time: '7:00 PM', isEnabled: false },
            ],
        },
    ];

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-10`}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={tw`py-4 items-center`}>
                <Text style={tw`text-lg font-semibold text-white`}>Alerts</Text>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                <View style={tw`gap-5`}>
                    <View style={tw`flex-row items-center bg-[#1E1E1E] rounded-lg border border-[#4B4B4B] p-3`}>
                        <View style={tw`w-8 h-8 rounded-full bg-gray-700 justify-center items-center`}>
                            <BellIcon style={tw`text-[#1976D2]`} />
                        </View>
                        <View style={tw`flex-1 mx-3`}>
                            <Text style={tw`text-white text-sm font-semibold`}>All Alerts</Text>
                            <Text style={tw`text-gray-400 text-xs mt-1`}>Enable all route alerts below</Text>
                        </View>
                        <ToggleSwitch value={allAlerts} onValueChange={setAllAlerts} />
                    </View>

                    {routes.map((route, index) => (
                        <RouteAlertsSection key={index} route={route} allAlertsEnabled={allAlerts} />
                    ))}
                </View>

                <View style={tw`bg-[#1E1E1E] rounded-lg border border-[#4B4B4B] p-4 gap-4 mt-4 `}>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-white text-sm font-semibold`}>Alert Timing</Text>
                        <TouchableOpacity style={tw`flex-row items-center gap-1`}>
                            <Text style={tw`text-white text-sm`}>5 minutes</Text>
                            <ChevronDownIcon style={tw`text-white`} />
                        </TouchableOpacity>
                    </View>
                    <View style={tw`flex-row justify-between items-center`}>
                        <Text style={tw`text-white text-sm`}>Quiet hours</Text>
                        <Text style={tw`text-gray-400 text-sm`}>10 PM - 7 AM</Text>
                    </View>
                </View>

                <View style={tw`gap-3 pt-4`}>
                    <Text style={tw`text-white text-base font-semibold`}>Recent Alerts</Text>
                    <RecentAlertCard
                        icon={<WarningIcon style={tw`text-white`} />}
                        iconBgColor="bg-red-600"
                        title="Route 2 Delayed"
                        body="Due to road construction, Route 2 is experiencing 15-minute delays."
                        time="2 hours ago"
                    />
                    <RecentAlertCard
                        icon={<InfoIcon style={tw`text-white`} />}
                        iconBgColor="bg-blue-600"
                        title="New Payment Options"
                        body="We have added new convenient ways to pay for your trips."
                        time="1 day ago"
                    />
                    <RecentAlertCard
                        icon={<InfoIcon style={tw`text-white`} />}
                        iconBgColor="bg-blue-600"
                        title="Holiday Schedule"
                        body="Modified schedules will be in effect during the upcoming holiday weekend."
                        time="3 days ago"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Notification;
