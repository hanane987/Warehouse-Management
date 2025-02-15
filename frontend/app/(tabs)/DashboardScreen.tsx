import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  warehouse: string;
  type: string;
  editedAt: string; 
}

interface DashboardStats {
  totalProducts: number;
  totalWarehouses: number;
  outOfStockProducts: Product[];
  totalStockValue: number;
  recentActivityProducts: Product[];
}

export default function DashboardScreen() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalWarehouses: 0,
    outOfStockProducts: [],
    totalStockValue: 0,
    recentActivityProducts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('http://192.168.8.105:3004/products');
      const products: Product[] = await response.json();
  
      const dashboardStats: DashboardStats = {
        totalProducts: products.length,
        totalWarehouses: new Set(products.map(p => p.warehouse)).size,
        outOfStockProducts: products.filter(p => p.quantity === 0),
        totalStockValue: products.reduce((total, product) => {
          const price = Number(product.price); 
          const quantity = Number(product.quantity); 
          return total + (price * quantity);
        }, 0),
        recentActivityProducts: products
          .sort((a, b) => new Date(b.editedAt).getTime() - new Date(a.editedAt).getTime())
          .slice(0, 5)
      };
  
      setStats(dashboardStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    icon, 
    color 
  }: { 
    title: string, 
    value: string | number, 
    icon: string, 
    color: string 
  }) => (
    <View style={styles.statCard}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statTitle}>{title}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );

  const ProductList = ({ 
    title, 
    products 
  }: { 
    title: string, 
    products: Product[] 
  }) => (
    <View style={styles.productListContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {products.map(product => (
        <View key={product.id} style={styles.productItem}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productQuantity}>Qty: {product.quantity}</Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <Text style={styles.screenTitle}>
        Statistiques et Résumé des Stocks
      </Text>

      <View style={styles.statsRow}>
        <StatCard 
          title="Total Products" 
          value={stats.totalProducts} 
          icon="cube" 
          color="#6A5ACD" 
        />
        <StatCard 
          title="Total Warehouses" 
          value={stats.totalWarehouses} 
          icon="business" 
          color="#4CAF50" 
        />
      </View>

      <View style={styles.statsRow}>
        <StatCard 
          title="Total Stock Value" 
          value={`€${stats.totalStockValue.toFixed(2)}`} 
          icon="cash" 
          color="#FF9800" 
        />
        <StatCard 
          title="Out of Stock" 
          value={stats.outOfStockProducts.length} 
          icon="alert-circle" 
          color="#F44336" 
        />
      </View>

      <ProductList 
        title="Recently Added/Modified Products" 
        products={stats.recentActivityProducts} 
      />

      <ProductList 
        title="Out of Stock Products" 
        products={stats.outOfStockProducts} 
      />
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', 
  },
  scrollContent: {
    padding: 16,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff', 
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: width / 2 - 24,
    backgroundColor: '#1e1e1e', 
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statTitle: {
    fontSize: 14,
    color: '#ffffff', 
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', 
  },
  productListContainer: {
    backgroundColor: '#1e1e1e', 
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#ffffff', 
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333', 
  },
  productName: {
    color: '#ffffff', 
  },
  productQuantity: {
    color: '#ffffff', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212', 
  },
  loadingText: {
    color: '#ffffff', 
  },
});