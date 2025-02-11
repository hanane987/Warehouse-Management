import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import AddProductForm from './AddProductForm'; // Import the AddProductForm component

interface Product {
    id: number;        // Assuming id is a number
    name: string;      // Assuming name is a string
    type: string;      // Assuming type is a string
    price: number;     // Assuming price is a number
    quantity: number;  // Assuming quantity is a number
}

const ProductsScreen = () => {
    const [products, setProducts] = useState<Product[]>([]); // Use the Product interface
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3003/products'); // Adjust the URL if needed
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                Alert.alert('Error', 'Failed to load products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <AddProductForm /> {/* Render the AddProductForm component */}
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productDetails}>Type: {item.type}</Text>
                        <Text style={styles.productDetails}>Price: ${item.price}</Text>
                        <Text style={styles.productDetails}>Quantity: {item.quantity}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    productItem: {
        marginBottom: 12,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 1,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productDetails: {
        fontSize: 14,
        color: '#555',
    },
});

export default ProductsScreen;