import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Modal,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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
  const [totalAmount, setTotalAmount] = useState<string>("600000");

  // State for managing modal and pay amount
  const [isPayModalVisible, setPayModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(
    null
  );
  const [payAmount, setPayAmount] = useState("");

  // Sample receipt data
  const [receiptData, setReceiptData] = useState<ReceiptItem[]>([
    {
      id: "CK000000012212",
      name: "Saman perera",
      rentalAmount: 100000,
      payAmount: 20000,
      due: 0,
    },
    {
      id: "CK000000012213",
      name: "Saman perera",
      rentalAmount: 100000,
      due: 0,
    },
    {
      id: "CK000000012214",
      name: "Saman perera",
      rentalAmount: 100000,
      payAmount: 20000,
      due: 0,
    },
  ]);

  // Handle pay amount entry
  const handlePayAmountEnter = () => {
    if (selectedReceipt) {
      // Update the selected receipt's payAmount
      const updatedReceipts = receiptData.map((receipt) =>
        receipt.id === selectedReceipt.id
          ? { ...receipt, payAmount: parseFloat(payAmount) }
          : receipt
      );

      // Update the receipt data
      setReceiptData(updatedReceipts);

      // Log the updated receipt
      console.log(`Pay amount entered for ${selectedReceipt.id}: ${payAmount}`);

      // Close the modal and reset the pay amount
      setPayModalVisible(false);
      setPayAmount("");
    }
  };

  // Handle total amount change
  const handleTotalAmountChange = (text: string) => {
    // Allow only numeric values
    const numericValue = text.replace(/[^0-9]/g, "");
    setTotalAmount(numericValue);
  };

  // Handle save action
  const handleSave = () => {
    console.log("Total Amount Saved:", totalAmount);
  };

  // Render individual receipt item
  const renderReceiptItem = ({ item }: { item: ReceiptItem }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedReceipt(item); // Set the selected receipt
        setPayModalVisible(true); // Open the modal
      }}
    >
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
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      <Header title="MF Receipt List" showBackButton={true} />
      <FlatList
        data={receiptData}
        renderItem={renderReceiptItem}
        keyExtractor={(item) => item.id}
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
            onChangeText={handleTotalAmountChange}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Pay Amount Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPayModalVisible}
        onRequestClose={() => setPayModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === "ios" ? "padding" : "padding"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <View style={styles.modalContainer}>
            {/* Updated Modal Title */}
            <Text style={styles.modalTitle}>
              Enter Pay Amount for{" "}
              <Text style={{ fontSize: 14 }}>
                {selectedReceipt ? selectedReceipt.id : ""}
              </Text>
            </Text>
            <TextInput
              style={styles.payAmountInput}
              placeholder="Enter Pay Amount"
              keyboardType="numeric"
              value={payAmount}
              onChangeText={(text) => setPayAmount(text.replace(/[^0-9]/g, ""))}
            />
            <TouchableOpacity
              style={styles.enterButton}
              onPress={handlePayAmountEnter}
            >
              <Text style={styles.enterButtonText}>Enter</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
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
    borderRadius: 40,
    paddingVertical: 16,

    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  totalAmountTitle: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  totalAmountInputContainer: {
    borderWidth: 1,

    borderRadius: 40,
    borderColor: "#CCCCCC",

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
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    // fontWeight: "bold",
    marginBottom: 15,
  },
  payAmountInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  enterButton: {
    backgroundColor: "#4285F4",
    width: "100%",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  enterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default MFReceiptList;
