import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { login } from './authService'; 
import useCustomNavigation from '@/hooks/useNavigation'; // Import the custom navigation hook

const LoginForm: React.FC = () => {
    const [secretCode, setSecretCode] = useState('');
    const { navigateToProducts } = useCustomNavigation(); // Use the custom navigation hook

    const handleLogin = async () => {
        const isAuthenticated = await login(secretCode);
        if (isAuthenticated) {
            Alert.alert('Succès', 'Vous êtes connecté avec succès !'); // Success message
            navigateToProducts(); // Redirect to ProductsScreen using the custom hook
        } else {
            Alert.alert('Erreur', 'Code secret invalide'); // Error message
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Entrez votre code secret"
                value={secretCode}
                onChangeText={setSecretCode}
                style={styles.input}
            />
            <Button title="Se connecter" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default LoginForm;