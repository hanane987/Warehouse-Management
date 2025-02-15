// hooks/useNavigation.ts
import { useRouter } from 'expo-router';

const useCustomNavigation = () => {
    const router = useRouter();

    const navigateToProducts = () => {
        router.replace('/(tabs)/ProductList');
    };
    const navigateToProductDetails = (productId: string) => {
        router.push(`/(tabs)/ProductDetails?productId=${productId}`); 
      };

  return { navigateToProducts, navigateToProductDetails };
};

export default useCustomNavigation;