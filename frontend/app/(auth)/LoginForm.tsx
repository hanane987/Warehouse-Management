import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Dimensions, 
  Alert 
} from 'react-native';
import { login } from '@/services/api/authService'; 
import useCustomNavigation from '@/hooks/useNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';


const loginImage = require('@/assets/images/log.jpg');

const { width, height } = Dimensions.get('window');

const LoginForm: React.FC = () => {
    const [secretCode, setSecretCode] = useState('');
    const { navigateToProducts } = useCustomNavigation();

    const handleLogin = async () => {
        try {
            const isAuthenticated = await login(secretCode);
            console.log(isAuthenticated);
            
            if (isAuthenticated) {
                await AsyncStorage.setItem('secretKey', secretCode);
                Alert.alert('Succès', 'Vous êtes connecté avec succès !');
                navigateToProducts();
            } else {
                Alert.alert('Erreur', 'Code secret invalide');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Erreur', 'Une erreur est survenue lors de la connexion');
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={loginImage} 
                style={styles.loginImage} 
                resizeMode="contain" 
            />
            
            <Text style={styles.title}>Login</Text>
            
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Entrez votre code secret"
                    value={secretCode}
                    onChangeText={setSecretCode}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            
            <TouchableOpacity 
                style={styles.button} 
                onPress={handleLogin}
                disabled={!secretCode}
            >
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    button: {
        backgroundColor: '#6A5ACD', 
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25, 
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loginImage: {
        width: width * 0.7,  
        height: height * 0.3, 
        marginBottom: 20,
    },
});

export default LoginForm;