import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Header from "@/components/Header";

// Define the receipt item type
type ReceiptItem = {
  id: string;
  name: string;
  rentalAmount: number;
  payAmount?: number;
  due: number;
};

const MFReceiptList: React.FC = () => {
  // Sample receipt data
  const receiptData: ReceiptItem[] = [
    {
      id: 'CK000000012212',
      name: 'Saman perera',
      rentalAmount: 100000,
      payAmount: 20000,
      due: 0,
    },
    {
      id: 'CK000000012212',
      name: 'Saman perera',
      rentalAmount: 100000,
      due: 0,
    },
    {
      id: 'CK000000012212',
      name: 'Saman perera',
      rentalAmount: 100000,
      due: 0,
    },
    {
      id: 'CK000000012212',
      name: 'Saman perera',
      rentalAmount: 100000,
      due: 0,
    },
    {
      id: 'CK000000012212',
      name: 'Saman perera',
      rentalAmount: 100000,
      due: 0,
    },
  ];

  // Render individual receipt item
  const renderReceiptItem = ({ item }: { item: ReceiptItem }) => (
    <View style={styles.receiptItemContainer}>
      <View style={styles.receiptItemHeader}>
        <Text style={styles.receiptId}>{item.id}</Text>
        <Text style={styles.receiptName}>{item.name}</Text>
      </View>
      <View style={styles.receiptDetailsContainer}>
        <View style={styles.rentalAmountContainer}>
          <Text style={styles.rentalAmountLabel}>RentalAmt</Text>
          <Text style={styles.rentalAmountValue}>= {item.rentalAmount.toLocaleString()}</Text>
        </View>
        {item.payAmount && (
          <View style={styles.payAmountContainer}>
            <Text style={styles.payAmountText}>PAY AMT - {item.payAmount.toLocaleString()}</Text>
          </View>
        )}
        <View style={styles.dueContainer}>
          <Text style={styles.dueLabel}>Due</Text>
          <Text style={styles.dueValue}>= {item.due}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      <Header
        title="MF Receipt List"
        showBackButton={true}
      />
      <FlatList
        data={receiptData}
        renderItem={renderReceiptItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    padding: 16,
  },
  receiptItemContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  receiptItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  receiptId: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  receiptName: {
    fontSize: 14,
    color: '#0086fe',
  },
  receiptDetailsContainer: {
    padding: 12,
  },
  rentalAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rentalAmountLabel: {
    color: '#666',
    fontSize: 14,
  },
  rentalAmountValue: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
  payAmountContainer: {
    backgroundColor: '#FFF4E5',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
    alignItems: 'center',
  },
  payAmountText: {
    color: '#FF9800',
    fontSize: 14,
    fontWeight: '600',
  },
  dueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dueLabel: {
    color: '#666',
    fontSize: 14,
  },
  dueValue: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default MFReceiptList;