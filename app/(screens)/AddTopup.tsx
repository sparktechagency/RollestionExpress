import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="18" height="18" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const CreditCardIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
        <Path fill="currentColor" d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
    </Svg>
);

// --- Reusable Components --- //

const QuickTopUpOption = ({ amount, rides, total }: { amount: number; rides: number; total: number }) => (
    <TouchableOpacity style={tw`flex-1 h-22 bg-[#1E1E1E] rounded-md border border-[#686868] justify-center items-center gap-1`}>
        <Text style={tw`text-base font-semibold`}>
            <Text style={tw`text-white`}>+ </Text>
            <Text style={tw`text-[#35C77E]`}>${amount.toFixed(2)}</Text>
        </Text>
        <Text style={tw`text-xs font-normal text-white`}>{rides} Ride{rides > 1 ? 's' : ''}</Text>
        <Text style={tw`text-xs font-normal text-[#FF6060]`}>Total: ${total.toFixed(2)}</Text>
    </TouchableOpacity>
);

const AmountPreset = ({ amount, onPress }: { amount: number; onPress: (amount: number) => void }) => (
    <TouchableOpacity
        onPress={() => onPress(amount)}
        style={tw`px-3 py-1 bg-[#1E1E1E] rounded-md border border-[#686868] justify-center items-center`}
    >
        <Text style={tw`text-white text-base font-normal`}>${amount}</Text>
    </TouchableOpacity>
);

const ToggleSwitch = ({ value, onValueChange }: { value: boolean; onValueChange: (value: boolean) => void }) => (
    <TouchableOpacity
        style={tw.style(`w-14 h-7 rounded-full justify-center`, value ? 'bg-blue-500' : 'bg-gray-500')}
        onPress={() => onValueChange(!value)}
        activeOpacity={0.8}
    >
        <View style={tw.style(`w-6 h-6 rounded-full`, value ? 'bg-white' : 'bg-gray-300')} />
    </TouchableOpacity>
);


// --- Main Component --- //

const AddTopup = () => {
    const [amount, setAmount] = useState('10.00');
    const [autoTopUp, setAutoTopUp] = useState(false);

    const quickTopUpOptions = [
        { amount: 3.50, rides: 1, total: 3.80 },
        { amount: 7.00, rides: 2, total: 7.30 },
        { amount: 14.00, rides: 4, total: 14.30 },
        { amount: 35.00, rides: 10, total: 35.30 },
    ];

    const amountPresets = [10, 20, 50, 100];

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] pt-8`}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Add Top Up</Text>
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

                {/* Quick Top Up */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-base font-semibold mb-2`}>Quick Top Up</Text>
                    <Text style={tw`text-white text-xs font-normal mb-4`}>Service costs $3.50 per ride. Top-up fee: $0.30</Text>
                    <View style={tw`flex-row gap-4 mb-3.5`}>
                        <QuickTopUpOption {...quickTopUpOptions[0]} />
                        <QuickTopUpOption {...quickTopUpOptions[1]} />
                    </View>
                    <View style={tw`flex-row gap-4`}>
                        <QuickTopUpOption {...quickTopUpOptions[2]} />
                        <QuickTopUpOption {...quickTopUpOptions[3]} />
                    </View>
                </View>

                {/* Enter Amount */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-base font-semibold mb-3`}>Enter Amount</Text>
                    <TextInput
                        style={tw`h-10 bg-[#1E1E1E] rounded-md border border-[#686868] px-4 text-white text-sm`}
                        placeholderTextColor="#989898"
                        value={`$${amount}`}
                        onChangeText={(text) => setAmount(text.replace('$', ''))}
                        keyboardType="numeric"
                    />
                    <View style={tw`flex-row gap-2 mt-3`}>
                        {amountPresets.map(preset => (
                            <AmountPreset key={preset} amount={preset} onPress={(val) => setAmount(val.toFixed(2))} />
                        ))}
                    </View>
                </View>

                {/* Payment Method */}
                <View style={tw`mb-8`}>
                    <Text style={tw`text-white text-base font-semibold mb-3`}>Payment Method</Text>
                    <TouchableOpacity style={tw`flex-row items-center h-10 bg-[#1E1E1E] rounded-md border border-[#686868] px-3`}>
                        <CreditCardIcon style={tw`text-white`} />
                        <Text style={tw`text-white text-sm font-normal ml-3`}>Card (via Stripe)</Text>
                    </TouchableOpacity>
                </View>

                {/* Auto Top-up */}
                <View style={tw`flex-row justify-between items-center`}>
                    <View style={tw`flex-1 pr-4`}>
                        <Text style={tw`text-white text-base font-semibold mb-2`}>Auto Top-up</Text>
                        <Text style={tw`text-white text-xs font-normal leading-snug`}>
                            Automatically add $35 (+ $0.30 fee) when balance falls below $3.50
                        </Text>
                    </View>
                    <ToggleSwitch value={autoTopUp} onValueChange={setAutoTopUp} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddTopup;
