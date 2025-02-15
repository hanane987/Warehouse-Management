import React, { useState, useCallback, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  Dimensions, 
  RefreshControl, 
  Image, 
  TextInput,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import useCustomNavigation from '../../hooks/useNavigation'; 

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  supplier: string;
  image?: string; 
}

const { width } = Dimensions.get('window');
const PRODUCTS_URL = 'http://192.168.8.105:3004/products';

export default function ProductList() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('name'); 
  const { navigateToProductDetails } = useCustomNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(PRODUCTS_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de charger les produits');
    } finally {
      setRefreshing(false);
    }
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.price.toString().includes(searchQuery)
    );
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    switch (sortOption) {
      case 'price':
        return a.price - b.price;
      case 'quantity':
        return a.quantity - b.quantity;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const renderProductItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity 
        style={styles.productItem} 
        onPress={() => navigateToProductDetails(item.id)} 
      >
        {item.image && <Image source={{ uri: item.image }} style={styles.productImage} />}
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <Text style={styles.productType}>Type: {item.type}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.priceText}>Prix: {item.price} €</Text>
            <Text style={styles.quantityText}>Quantité: {item.quantity}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#fff" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <View style={styles.sortButtonsContainer}>
        <TouchableOpacity onPress={() => setSortOption('name')} style={styles.sortButton}>
          <Ionicons name="md-alphabet" size={18} color="#fff" />
          <Text style={styles.sortButtonText}>Nom</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('price')} style={styles.sortButton}>
          <Ionicons name="md-pricetag" size={18} color="#fff" />
          <Text style={styles.sortButtonText}>Prix</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortOption('quantity')} style={styles.sortButton}>
          <FontAwesome name="cogs" size={18} color="#fff" />
          <Text style={styles.sortButtonText}>Quantité</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchProducts}
            colors={['#6A5ACD']}
            tintColor="#6A5ACD"
          />
        }
        numColumns={2} 
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun produit trouvé</Text>
            <TouchableOpacity 
              style={styles.refreshButton} 
              onPress={fetchProducts}
            >
              <Ionicons name="refresh" size={24} color="white" />
              <Text style={styles.refreshButtonText}>Actualiser</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#6A5ACD',
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  sortButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  sortButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#6A5ACD',
    alignItems: 'center',
    borderRadius: 20, 
    marginHorizontal: 5,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  sortButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  listContent: {
    padding: 10,
  },
  productItem: {
    backgroundColor: '#fff', 
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 5, 
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
    width: width * 0.45, 
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productDetails: {
    alignItems: 'center',
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  productType: {
    fontSize: 14,
    color: '#555',
  },
  priceText: {
    fontSize: 14,
    color: '#333',
  },
  quantityText: {
    fontSize: 14,
    marginTop: 5,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#555',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 10,
  },
  refreshButtonText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  quantityContainer: {},
});