import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from "react-native";
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
  // State for total amount
  // State for managing modal and pay amount
  const [isPayModalVisible, setPayModalVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState<string>("600000");

  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(
    null
  );
  const [payAmount, setPayAmount] = useState("");
  // Sample receipt data
  const receiptData: ReceiptItem[] = [
    {
      id: "CK000000012212",
      name: "Saman perera",
      rentalAmount: 100000,
      payAmount: 20000,
      due: 0,
    },
    {
      id: "CK000000012212",
      name: "Saman perera",
      rentalAmount: 100000,

      due: 0,
    },
    {
      id: "CK000000012212",
      name: "Saman perera",
      rentalAmount: 100000,
      payAmount: 20000,
      due: 0,
    },
    {
      id: "CK000000012212",
      name: "Saman perera",
      rentalAmount: 100000,

      due: 0,
    },
    {
      id: "CK000000012212",
      name: "Saman perera",
      rentalAmount: 100000,
      payAmount: 20000,
      due: 0,
    },
    {
      id: "CK000000012212",
      name: "Saman perera",
      rentalAmount: 100000,
      payAmount: 20000,
      due: 0,
    },
  ];

  // Handle pay amount entry
  const handlePayAmountEnter = () => {
    if (selectedReceipt) {
      // Here you can add logic to process the pay amount
      console.log(`Pay amount entered for ${selectedReceipt.id}: ${payAmount}`);
      setPayModalVisible(false);
      setPayAmount('');
    }
  };


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
          <Text style={styles.rentalAmountValue}>
            {item.rentalAmount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.dueContainer}>
          <Text style={styles.dueLabel}>Due</Text>
          <Text style={styles.dueValue}>{item.due}</Text>
        </View>
        {item.payAmount && (
          <View style={styles.payAmountContainer}>
            <Text style={styles.payAmountText}>
              PAY AMT - {item.payAmount.toLocaleString()}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  // Handle save action
  const handleSave = () => {
    console.log("Total Amount Saved:", totalAmount);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      <Header title="MF Receipt List" showBackButton={true} />
      <FlatList
        data={receiptData}
        renderItem={renderReceiptItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContainer}
      />

      {/* Total Amount Section */}
      <View style={styles.totalAmountContainer}>
        <Text style={styles.totalAmountTitle}>Total Amount</Text>
        <View style={styles.totalAmountInputContainer}>
          <TextInput
            style={styles.totalAmountInput}
            placeholder="Enter total amount"
            value={totalAmount}
            onChangeText={setTotalAmount}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 30,
  },
  receiptItemContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 0.5,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  receiptItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  receiptId: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
  receiptName: {
    fontSize: 12,
    color: "#0086fe",
  },
  receiptDetailsContainer: {
    padding: 9,
  },
  rentalAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rentalAmountLabel: {
    color: "#666",
    fontSize: 12,
  },
  rentalAmountValue: {
    color: "#FF0000",
    fontSize: 12,
    fontWeight: "600",
  },
  payAmountContainer: {
    backgroundColor: "#FFF4E5",
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
    alignItems: "center",
  },
  payAmountText: {
    color: "#FF9800",
    fontSize: 12,
    fontWeight: "600",
  },
  dueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dueLabel: {
    color: "#666",
    fontSize: 12,
  },
  dueValue: {
    color: "#4CAF50",
    fontSize: 12,
    fontWeight: "600",
  },
  // Total Amount Section Styles
  totalAmountContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalAmountTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  totalAmountInputContainer: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    marginBottom: 16,
  },
  totalAmountInput: {
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4285F4",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default MFReceiptList;
