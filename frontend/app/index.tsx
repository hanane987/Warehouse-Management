import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { Link, Redirect, useRouter } from 'expo-router';

export default function Index() {
    const router = useRouter();
    useEffect(() => {
        const checkToken = async () => {
            // await AsyncStorage.removeItem('secretKey');
            const token = await AsyncStorage.getItem('secretKey');
            if (token) {
                router.replace('/(tabs)/ProductList');
            } else {
                router.replace('/(auth)/LoginForm');
            }
        };
        checkToken();
    }, [router]);

//   return (
//     <Redirect href="/(home)" />
//   )
}