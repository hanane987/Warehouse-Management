import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
  Button
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print'; 

interface EditedBy {
  warehousemanId: number;
  at: string;
}

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;       
  solde: number;       
  quantity: number;
  supplier: string;
  editedBy: EditedBy;
  image?: string;
}

const PRODUCTS_URL = 'http://192.168.8.105:3004/products';

export default function ProductDetails() {
  type ProductRouteParams = {
    productId: string;
  };

  const route = useRoute<RouteProp<{ params: ProductRouteParams }>>();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);


  const [modalVisible, setModalVisible] = useState(false);
  const [operation, setOperation] = useState<'restock' | 'unload' | null>(null);
  const [quantityInput, setQuantityInput] = useState<string>('');

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`${PRODUCTS_URL}/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les détails du produit');
    }
  };

  const updateProductQuantity = async (newQuantity: number) => {
    if (!product) return;
    try {
      const response = await fetch(`${PRODUCTS_URL}/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });
      if (response.ok) {
        setProduct({ ...product, quantity: newQuantity });
        setModalVisible(false);
        setQuantityInput('');
      } else {
        Alert.alert('Erreur', 'Mise à jour impossible');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue');
    }
  };

  const handleUpdate = () => {
    if (!product || !operation) return;
    const amount = parseInt(quantityInput, 10);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Erreur', 'Veuillez entrer un nombre valide');
      return;
    }
    let newQuantity = product.quantity;
    if (operation === 'restock') {
      newQuantity += amount;
    } else if (operation === 'unload') {
      newQuantity -= amount;
      if (newQuantity < 0) {
        Alert.alert('Erreur', 'Quantité insuffisante');
        return;
      }
    }
    updateProductQuantity(newQuantity);
  };

  const getStockStatus = () => {
    if (!product) return { status: '', color: '#000' };
    if (product.quantity === 0) return { status: 'Stock épuisé', color: '#d32f2f' };
    if (product.quantity < 10) return { status: 'Stock faible', color: '#ffa000' };
    return { status: 'En stock', color: '#388e3c' };
  };

  const generatePDF = async () => {
    if (!product) return;
    const html = `
      <h1 style="text-align: center;">${product.name}</h1>
      <p>Type: ${product.type}</p>
      <p>Prix régulier: ${product.price} €</p>
      <p>Solde: ${product.solde} €</p>
      <p>Quantité disponible: ${product.quantity}</p>
      <p>Fournisseur: ${product.supplier}</p>
      <p>Produit édité par: ${product.editedBy.warehousemanId} à ${product.editedBy.at}</p>
    `;
    await Print.printAsync({
      html,
    });
  };

  if (!product) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  const stockStatus = getStockStatus();

  return (
    <View style={styles.container}>
      {product.image && <Image source={{ uri: product.image }} style={styles.productImage} />}
      <View style={styles.infoRow}>
        <Ionicons name="pricetag-outline" size={20} color="#333" style={styles.infoIcon} />
        <Text style={styles.productName}>{product.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="cube-outline" size={20} color="#555" style={styles.infoIcon} />
        <Text style={styles.productType}>Type: {product.type}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="cash-outline" size={20} color="#333" style={styles.infoIcon} />
        <Text style={styles.priceText}>Prix régulier: {product.price} €</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="pricetag" size={20} color="#333" style={styles.infoIcon} />
        <Text style={styles.priceText}>Solde: {product.solde} €</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="list-outline" size={20} color="#333" style={styles.infoIcon} />
        <Text style={styles.quantityText}>Quantité disponible: {product.quantity}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="alert-circle-outline" size={20} color={stockStatus.color} style={styles.infoIcon} />
        <Text style={[styles.stockStatus, { color: stockStatus.color }]}>{stockStatus.status}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="person-outline" size={20} color="#777" style={styles.infoIcon} />
        <Text style={styles.editedByText}>
          Produit édité par: {product.editedBy.warehousemanId} à {product.editedBy.at}
        </Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="storefront-outline" size={20} color="#444" style={styles.infoIcon} />
        <Text style={styles.supplierText}>Fournisseur: {product.supplier}</Text>
      </View>

     
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.restockButton]}
          onPress={() => { setOperation('restock'); setModalVisible(true); }}
        >
          <Ionicons name="add-circle-outline" size={14} color="white" />
          <Text style={styles.actionButtonText}>Réapprovisionner</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.unloadButton]}
          onPress={() => { setOperation('unload'); setModalVisible(true); }}
        >
          <Ionicons name="remove-circle-outline" size={14} color="white" />
          <Text style={styles.actionButtonText}>Décharger</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.pdfButton]}
          onPress={generatePDF}
        >
          <Ionicons name="document-outline" size={14} color="white" />
          <Text style={styles.actionButtonText}>Exporter PDF</Text>
        </TouchableOpacity>
      </View>

     
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {operation === 'restock' ? 'Réapprovisionner' : 'Décharger'}
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Entrez le nombre d'unités"
              keyboardType="numeric"
              value={quantityInput}
              onChangeText={setQuantityInput}
            />
            <View style={styles.modalButtonsContainer}>
              <Button title="Annuler" onPress={() => { setModalVisible(false); setQuantityInput(''); }} />
              <Button title="Valider" onPress={handleUpdate} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    width: '100%',
    justifyContent: 'flex-start',
  },
  infoIcon: {
    marginRight: 5,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
  },
  productType: {
    fontSize: 18,
    color: '#555',
  },
  priceText: {
    fontSize: 18,
    color: '#333',
  },
  quantityText: {
    fontSize: 18,
    color: '#333',
  },
  stockStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editedByText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
  supplierText: {
    fontSize: 16,
    color: '#444',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-evenly',
    width: '100%',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2, 
    paddingHorizontal: 6, 
    borderRadius: 20,
    minWidth: 80, 
  },
  restockButton: {
    backgroundColor: '#10b981',
  },
  unloadButton: {
    backgroundColor: '#d32f2f',
  },
  pdfButton: {
    backgroundColor: '#007aff', 
  },
  actionButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 12, 
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  }, 
});