import { useRouter } from 'expo-router';

const useCustomNavigation = () => {
    const router = useRouter();

    const navigateToProducts = () => {
        router.replace('/(tabs)/ProductsScreen');
    };

    return { navigateToProducts };
};

export default useCustomNavigation;