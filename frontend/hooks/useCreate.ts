import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import useValidation from "./validation/useValidation";

export default function useCreate({ codeScanned }: { codeScanned: string }) {
    const router = useRouter();
    const { validateFields } = useValidation();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [barcode, setBarcode] = useState('');
    const [price, setPrice] = useState('');
    const [solde, setSolde] = useState('');
    const [supplier, setSupplier] = useState('');
    const [image, setImage] = useState('');
    const [stockName, setStockName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [city, setCity] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});






    interface User {
        id: number,
        secretKey: string;
    }

    interface Product {
        name: string;
        type: string;
        barcode: string;
        price: number;
        solde: number;
        supplier: string;
        image: string;
        stocks: Stock[];
        editedBy: EditedBy[];
    }
    
    interface Stock {
        name: string;
        quantity: number;
        localisation: {
            city: string;
        };
    }
    
    interface EditedBy {
        warehousemanId: number;
        at: string;
    }







    const warehouseOptions = [
        { id: '1', name: 'Gueliz B2', city: 'Marrakesh' },
        { id: '2', name: 'Lazari H2', city: 'Oujda' }
    ];

    useEffect(() => {
        if (codeScanned && typeof codeScanned === 'string') {
            const codbarData = JSON.parse(codeScanned);
            setBarcode(codbarData); 
        }
    }, [codeScanned]);

    const handleSubmit = async () => {
        const errorMessage = validateFields({
            name,
            barcode,
            price: parseFloat(price),
            solde: parseFloat(solde),
            supplier,
            image,
            quantity: parseInt(quantity),
        });
        setErrors(errorMessage);
        if (Object.keys(errorMessage).length !== 0) {
            console.log('Validation errors:', errorMessage);
            return; 
        }

        const warehousemanId = await getTokenData();
        // console.log(warehousemanId);
        // console.log(barcode);
        
        
        const newProduct = {
            name,
            type,
            barcode,
            price: parseFloat(price),
            solde: parseFloat(solde),
            supplier,
            image,
            stocks: [
                {
                    name: stockName,
                    quantity: parseInt(quantity),
                    localisation: {
                        city
                    }
                }
            ],
            editedBy: warehousemanId ? [{ warehousemanId, at: new Date().toISOString().split('T')[0] }] : []
        };

        try {
            await insertProduct(newProduct);
            Alert.alert('Success', 'Product added successfully!');

         
            resetForm();
            router.replace('/(tabs)/ProductList');
        } catch (error) {
            console.error('Error inserting product:', error);
            Alert.alert('Error', 'Failed to save product.');
        }
    };

    const insertProduct = async (product: Product): Promise<Product> => {
        try {
            const response = await fetch(`http://192.168.8.105:3004/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product)
            });

            if (!response.ok) throw new Error('Failed to save product');
            
            return await response.json();
        } catch (error) {
            console.error('Error inserting product:', error);
            throw error;
        }
    };

    const resetForm = () => {
        setName('');
        setType('');
        setBarcode('');
        setPrice('');
        setSolde('');
        setSupplier('');
        setImage('');
        setStockName('');
        setQuantity('');
        setCity('');
        setErrors({});
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access media library is required!");
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const getTokenData = async () => {
        try {
            const token = await AsyncStorage.getItem('secretKey');
            if (token) {
                const warehousemanData = await fetchWarehousemanFromDB(token);            
                return warehousemanData?.id;
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    const fetchWarehousemanFromDB = async (token: string): Promise<User | null> => {
        try {
            const response = await fetch(`http://192.168.8.105:3004/users`); 
            const users: User[] = await response.json();                        
            return users.find(user => user.secretKey === token) || null;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    return {
        name,
        type,
        price,
        image,
        stockName,
        barcode,
        quantity,
        city,
        supplier,
        solde,
        setName,
        setType,
        setPrice,
        setStockName,
        setBarcode,
        setQuantity,
        setCity,
        setSupplier,
        setSolde,
        handleSubmit,
        pickImage,
        warehouseOptions,
        errors
    }
}