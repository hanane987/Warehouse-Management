import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from './LoginForm'; // Ensure this path is correct

const LoginScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <LoginForm /> {/* No need to pass navigation prop anymore */}
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