import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import tw from 'twrnc';

// --- SVG Icon Components --- //

const ChevronLeftIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 16 16" style={style}>
        <Path fill="currentColor" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
    </Svg>
);

const FaqIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </Svg>
);

const EmailIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </Svg>
);

const CallIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.02.74-.25 1.02l-2.2 2.2z" />
    </Svg>
);

const LocationIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </Svg>
);

const ClockIcon = ({ style }: { style?: any }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style}>
        <Path fill="currentColor" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </Svg>
);

// --- Reusable Components --- //

const ContactOptionCard = ({ icon, title, subtitle, onPress }: { icon: React.ReactNode; title: string; subtitle: string; onPress: () => void; }) => (
    <TouchableOpacity onPress={onPress} style={tw`flex-1 h-24 bg-[#1E1E1E] rounded-lg border border-gray-700 justify-center items-center p-2`}>
        <View style={tw`items-center gap-1`}>
            {icon}
            <Text style={tw`text-white text-sm font-semibold`}>{title}</Text>
            <Text style={tw`text-gray-400 text-xs text-center`}>{subtitle}</Text>
        </View>
    </TouchableOpacity>
);

const FormInput = ({ label, value, onChangeText, placeholder, multiline = false }: { label: string; value: string; onChangeText: (text: string) => void; placeholder: string; multiline?: boolean; }) => (
    <View style={tw`gap-1.5`}>
        <Text style={tw`text-white text-sm font-semibold`}>{label}</Text>
        <TextInput
            style={tw.style(
                `bg-[#4B4B4B] rounded-md text-white px-3`,
                multiline ? 'h-28 pt-2' : 'h-10'
            )}
            placeholder={placeholder}
            placeholderTextColor="#989898"
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
        />
    </View>
);

// --- Main Component --- //

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: 'Liam@gmail.com', message: '' });

    const handleInputChange = (field: keyof typeof form, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView style={tw`flex-1 bg-[#151515] `}>

            {/* Header */}
            <View style={tw`flex-row items-center p-4`}>
                <TouchableOpacity onPress={() => router.back()}>
                    <ChevronLeftIcon style={tw`text-white`} />
                </TouchableOpacity>
                <Text style={tw`text-lg font-semibold text-white ml-3`}>Contact Us</Text>
            </View>

            <ScrollView contentContainerStyle={tw`px-5 pb-10`}>
                {/* Contact Options */}
                <View style={tw`flex-row gap-4 mb-6`}>
                    <ContactOptionCard icon={<FaqIcon style={tw`text-blue-400`} />} title="FAQs" subtitle="Common questions" onPress={() => { }} />
                    <ContactOptionCard icon={<CallIcon style={tw`text-blue-400`} />} title="Call Us" subtitle="+013545555" onPress={() => { }} />
                </View>
                <View style={tw`flex-row gap-4 mb-8`}>
                    <ContactOptionCard icon={<EmailIcon style={tw`text-blue-400`} />} title="Email Us" subtitle="support@gmail.com" onPress={() => { }} />
                    <View style={tw`flex-1 h-24`} />
                </View>


                {/* Submit Ticket */}
                <View style={tw`bg-[#1E1E1E] rounded-lg border border-gray-700 p-5 mb-8`}>
                    <Text style={tw`text-base font-semibold text-white mb-5`}>Submit a Ticket</Text>
                    <View style={tw`gap-4`}>
                        <FormInput label="Full Name" placeholder="Your Name" value={form.name} onChangeText={(val) => handleInputChange('name', val)} />
                        <FormInput label="Email" placeholder="Your Email" value={form.email} onChangeText={(val) => handleInputChange('email', val)} />
                        <FormInput label="Message" placeholder="Describe your issue" value={form.message} onChangeText={(val) => handleInputChange('message', val)} multiline />
                    </View>
                    <TouchableOpacity style={tw`bg-blue-600 rounded-lg py-3 mt-6 items-center`}>
                        <Text style={tw`text-white font-semibold`}>Submit</Text>
                    </TouchableOpacity>
                </View>

                {/* Office Info */}
                <View style={tw`bg-[#1E1E1E] rounded-lg border border-gray-700 p-5`}>
                    <Text style={tw`text-base font-semibold text-white mb-5`}>Office Information</Text>
                    <View style={tw`gap-4`}>
                        <View style={tw`flex-row items-start gap-3`}>
                            <LocationIcon style={tw`text-blue-400 mt-0.5`} />
                            <Text style={tw`text-gray-300 text-sm leading-snug flex-1`}>
                                RX Rolleston Transport{'\n'}
                                123 Main Street, Rolleston 7614{'\n'}
                                Canterbury, New Zealand
                            </Text>
                        </View>
                        <View style={tw`flex-row items-start gap-3`}>
                            <ClockIcon style={tw`text-blue-400 mt-0.5`} />
                            <Text style={tw`text-gray-300 text-sm leading-snug flex-1`}>
                                Office Hours{'\n'}
                                Monday - Friday: 7:00 AM - 6:00 PM{'\n'}
                                Saturday: 8:00 AM - 4:00 PM{'\n'}
                                Sunday: Closed
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Contact;
