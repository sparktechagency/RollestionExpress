import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc'; // Assuming twrnc is configured

// Assume COLORS constant is defined like this
const COLORS = {
    green: '#4CAF50', // Example green color
};

const BallanceCard = () => {
    return (
        <View style={tw`flex-row max-h-[200px] bg-white rounded-xl overflow-hidden  mb-6 shadow-lg`}>

            <LinearGradient
                style={tw`flex-1 justify-center items-center py-6 px-3`}
                colors={['#1976D2', '#0D3D6C']}
                start={{ x: 1, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                <Text style={tw`text-white text-2xl font-semibold text-center`}>Balance</Text>
                <Text style={tw`text-[${COLORS.green}] text-3xl font-bold mb-4 text-center`}>$ 7.00</Text>

                {/* Top Up Button */}
                <TouchableOpacity
                    onPress={() => router.push('/(screens)/AddTopup')}
                    activeOpacity={0.8}
                    style={tw`rounded-xl border-2 border-[#95C0EA] overflow-hidden`}
                >
                    <LinearGradient
                        colors={['#1976D2', '#0D3D6C']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={tw`py-2 px-5 items-center justify-center`}
                    >
                        <Text style={tw`text-white text-base font-semibold`}>+ Top Up</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </LinearGradient>

            {/* Barcode section */}
            <View style={tw`flex-1 items-center justify-center p-2.5`}>
                <Image
                    source={require('../../../assets/images/barCode.png')} // Make sure the path is correct
                    style={tw`w-full h-full`}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

export default BallanceCard;
