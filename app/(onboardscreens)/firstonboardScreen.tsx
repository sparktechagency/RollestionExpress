import { nextButtonicon } from '@/assets/icon/Icon';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface Slide {
    id: string;
    title: string;
    description: string;
    image: any;
}

const slides: Slide[] = [
    {
        id: '1',
        title: 'Board Buses with a Simple Scan',
        description:
            'Skip the hassle — just scan your barcode and ride instantly. No paper tickets or complicated bookings.',
        image: require('../../assets/images/Onaboarding screen 1.png'),
    },
    {
        id: '2',
        title: 'Top-Up & Pay Your Way',
        description:
            'Securely top-up your balance via card or cash and manage all your travel payments in one place',
        image: require('../../assets/images/Onaboarding screen 2.png'),
    },
    {
        id: '3',
        title: 'Live Updates & Trip History',
        description:
            'Get notified about delays or route changes, and track all your trips anytime.',
        image: require('../../assets/images/Onaboarding screen 3.png'),
    },
];

export default function OnboardingScreens(): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const router = useRouter();

    const handleNext = () => {
        // Fade out
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            // After fade out, update content
            if (currentIndex < slides.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                router.replace('/(authscreen)/login');
            }

            // Then fade in new content
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        });
    };

    const currentSlide = slides[currentIndex];

    return (
        <ImageBackground source={currentSlide.image} style={styles.slide}>
            <View style={styles.overlay}>
                <Animated.View style={{ opacity: fadeAnim }}>
                    <Text style={styles.title}>{currentSlide.title}</Text>
                    <Text style={styles.description}>{currentSlide.description}</Text>
                </Animated.View>

                <View style={styles.buttonContainer}>
                    <View style={styles.dotsContainer}>
                        {slides.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    { backgroundColor: index === currentIndex ? '#007AFF' : '#ccc' },
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity onPress={handleNext}>
                        <SvgXml xml={nextButtonicon} width={44} height={44} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    slide: {
        width,
        height,
        justifyContent: 'flex-end',
    },
    overlay: {
        paddingBottom: 60,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        color: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 33,
        paddingHorizontal: 12,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 60,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 5,
    },
});
