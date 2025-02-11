import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from './LoginForm'; // Ensure this path is correct
import { NavigationProp } from '@react-navigation/native';

interface LoginScreenProps {
    navigation: NavigationProp<any>; 
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <LoginForm navigation={navigation} /> {/* Ensure navigation prop is passed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;