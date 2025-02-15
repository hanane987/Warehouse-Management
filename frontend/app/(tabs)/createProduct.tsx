import { View, TextInput, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useCreate from '@/hooks/useCreate';

const CreateProduct = () => {
    const { codeScanned } = useLocalSearchParams();
    const scannedCode = typeof codeScanned === 'string' ? codeScanned : '';

    const {
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
    } = useCreate({ codeScanned: scannedCode });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.heading}>Create Product</Text>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, errors.name ? { borderColor: 'red' } : null]} 
                        placeholder="Product Name" 
                        placeholderTextColor={errors.name ? 'red' : 'gray'} 
                        value={name} 
                        onChangeText={setName} 
                    />
                    {errors.name && <Text style={styles.error}>{errors.name}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, errors.barcode ? { borderColor: 'red' } : null]} 
                        placeholder="Barcode" 
                        placeholderTextColor={errors.barcode ? 'red' : 'gray'} 
                        value={barcode} 
                        onChangeText={setBarcode} 
                    />
                    {errors.barcode && <Text style={styles.error}>{errors.barcode}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, errors.price ? { borderColor: 'red' } : null]} 
                        placeholder="Price" 
                        placeholderTextColor={errors.price ? 'red' : 'gray'} 
                        value={price} 
                        keyboardType="numeric" 
                        onChangeText={setPrice} 
                    />
                    {errors.price && <Text style={styles.error}>{errors.price}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, errors.solde ? { borderColor: 'red' } : null]} 
                        placeholder="Solde" 
                        placeholderTextColor={errors.solde ? 'red' : 'gray'} 
                        value={solde} 
                        keyboardType="numeric" 
                        onChangeText={setSolde} 
                    />
                    {errors.solde && <Text style={styles.error}>{errors.solde}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, errors.supplier ? { borderColor: 'red' } : null]} 
                        placeholder="Supplier" 
                        placeholderTextColor={errors.supplier ? 'red' : 'gray'} 
                        value={supplier} 
                        onChangeText={setSupplier} 
                    />
                    {errors.supplier && <Text style={styles.error}>{errors.supplier}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput 
                        style={[styles.input, errors.quantity ? { borderColor: 'red' } : null]} 
                        placeholder="Stock Quantity" 
                        placeholderTextColor={errors.quantity ? 'red' : 'gray'} 
                        value={quantity} 
                        keyboardType="numeric" 
                        onChangeText={setQuantity} 
                    />
                    {errors.quantity && <Text style={styles.error}>{errors.quantity}</Text>}
                </View>

                <View style={styles.inputContainer}>
                    <View style={[styles.imageContainer, image && styles.rowLayout]}>
                        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                        <TouchableOpacity 
                            style={[styles.button, errors.image ? { borderColor: 'red' } : null, image && styles.smallButton]} 
                            onPress={pickImage}
                        >
                            <Text style={[styles.buttonText, image && styles.smallButtonText]}>Pick an image from gallery</Text>
                        </TouchableOpacity>
                    </View>
                    {errors.image && <Text style={styles.error}>{errors.image}</Text>}
                </View>

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
        marginTop: 20,
    },
    heading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 25, 
        backgroundColor: '#f4f4f4',
    },
    error: {
        color: 'red',
        fontSize: 12,
    },
    submitButton: {
        width: '100%',
        padding: 15,
        borderRadius: 25, 
        backgroundColor: '#B2A5FF',
        marginTop: 15,
    },
    submitButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
    },
    imageContainer: {
        width: '100%',
        flexDirection: 'row',  
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 20,
    },
    button: {
        width: '100%',
        padding: 10,
        borderRadius: 25, 
        borderWidth: 1,
        borderColor: 'gray',
        borderStyle: 'dashed',
    },
    buttonText: {
        color: 'gray',
        fontSize: 16,
    },
    smallButton: {
        width: '84%',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#B2A5FF',
        borderStyle: 'dashed',
    },
    imagePreview: {
        width: 40,
        height: 40,
        borderRadius: 5,
        marginTop: 20,
    },
    smallButtonText: {
        color: '#B2A5FF',
        fontSize: 16,
    },

    rowLayout: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 10,  
    }
});

export default CreateProduct;