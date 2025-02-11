import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute', // Use a transparent background on iOS to show the blur effect
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index" // This should correspond to the Home screen
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="explore" // This should correspond to the Explore screen
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
                }}
            />
            <Tabs.Screen
                name="ProductsScreen" // Ensure this matches the filename of ProductsScreen.tsx
                options={{
                    title: 'Products',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="box" color={color} />, // Example icon
                }}
            />
            <Tabs.Screen
                name="LoginScreen" // Ensure this matches the filename of LoginScreen.tsx
                options={{
                    title: 'Login',
                    tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
                }}
            />
        </Tabs>
    );
}