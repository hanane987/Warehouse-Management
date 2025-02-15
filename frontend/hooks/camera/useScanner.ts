import { CameraType, useCameraPermissions } from "expo-camera";
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from "react-native";


export default function useScanner() {
    const router = useRouter();
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
        setScanned(true);
        console.log(data);

        Alert.alert('Barcode Scanned', data);
        

        const response = await fetch(`http://192.168.43.159:3004/products`);
        const products = await response.json();
        console.log(products);

        const product = products.find((product: any) => product.barcode === data);

        if (product) {
            setScanned(false);
            router.push({
                pathname: "/ProductDetails",
                params: { barcode: JSON.stringify(data) }, 
            });
            
        } else {
            setScanned(false);
            router.push({
                pathname: "/createProduct",
                params: { codeScanned: JSON.stringify(data) }, 
            });
            
        }
    };

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    return {
        facing,
        permission,
        scanned,
        requestPermission,
        handleBarCodeScanned,
        toggleCameraFacing,
    }
}
