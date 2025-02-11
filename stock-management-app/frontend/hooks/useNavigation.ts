import { useNavigation } from '@react-navigation/native';

const useCustomNavigation = () => {
    const navigation = useNavigation();

    const navigateToProducts = () => {
        navigation.navigate('ProductsScreen' as never); // Cast to 'never' to bypass TypeScript error
    };

    return {
        navigateToProducts,
    };
};

export default useCustomNavigation;