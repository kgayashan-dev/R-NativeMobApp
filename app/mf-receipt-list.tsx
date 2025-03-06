import React, { useState, useEffect } from "react";
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
  ActivityIndicator,
  Alert,
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

// API response types
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const MFReceiptList: React.FC = () => {
  // State for total amount
  const [totalAmount, setTotalAmount] = useState<string>("600000");

  // State for managing modal and pay amount
  const [isPayModalVisible, setPayModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(null);
  const [payAmount, setPayAmount] = useState("");

  // Sample receipt data
  const [receiptData, setReceiptData] = useState<ReceiptItem[]>([]);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Loading states for specific operations
  const [isSaving, setIsSaving] = useState(false);
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false);

  // Fetch receipt data on component mount
  useEffect(() => {
    fetchReceiptData();
  }, []);

  // Function to fetch receipt data
  const fetchReceiptData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Sample data - replace with actual API call
      const sampleData: ReceiptItem[] = [
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
      ];
      
      setReceiptData(sampleData);
    } catch (err) {
      setError("Failed to load receipt data. Please try again.");
      console.error("Error fetching receipt data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pay amount entry with error handling
  const handlePayAmountEnter = async () => {
    if (!selectedReceipt) return;
    
    if (!payAmount || parseFloat(payAmount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid payment amount.");
      return;
    }
    
    setIsUpdatingPayment(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Update the selected receipt's payAmount
      const updatedReceipts = receiptData.map((receipt) =>
        receipt.id === selectedReceipt.id
          ? { ...receipt, payAmount: parseFloat(payAmount) }
          : receipt
      );

      // Update the receipt data
      setReceiptData(updatedReceipts);
      console.log(`Pay amount entered for ${selectedReceipt.id}: ${payAmount}`);
      
      // Close the modal and reset the pay amount
      setPayModalVisible(false);
      setPayAmount("");
    } catch (err) {
      Alert.alert(
        "Payment Update Failed", 
        "Failed to update payment amount. Please try again."
      );
      console.error("Error updating payment:", err);
    } finally {
      setIsUpdatingPayment(false);
    }
  };

  // Handle total amount change
  const handleTotalAmountChange = (text: string) => {
    // Allow only numeric values
    const numericValue = text.replace(/[^0-9]/g, "");
    setTotalAmount(numericValue);
  };

  // Handle save action with error handling
  const handleSave = async () => {
    if (!totalAmount || parseFloat(totalAmount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid total amount.");
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      console.log("Total Amount Saved:", totalAmount);
      Alert.alert("Success", "Total amount saved successfully.");
    } catch (err) {
      Alert.alert(
        "Save Failed", 
        "Failed to save total amount. Please try again."
      );
      console.error("Error saving total amount:", err);
    } finally {
      setIsSaving(false);
    }
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

  // Render loading state
  const renderLoading = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#4285F4" />
      <Text style={styles.loadingText}>Loading receipts...</Text>
    </View>
  );

  // Render error state
  const renderError = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={fetchReceiptData}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  // Render empty state
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No receipt data available.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      <Header title="MF Receipt List" showBackButton={true} />
      
      {/* Main content */}
      {isLoading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        <FlatList
          data={receiptData}
          renderItem={renderReceiptItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyList}
          refreshing={isLoading}
          onRefresh={fetchReceiptData}
        />
      )}

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
            editable={!isSaving}
          />
        </View>
        <TouchableOpacity 
          style={[styles.saveButton, isSaving && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Pay Amount Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPayModalVisible}
        onRequestClose={() => !isUpdatingPayment && setPayModalVisible(false)}
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
              editable={!isUpdatingPayment}
            />
            <TouchableOpacity
              style={[styles.enterButton, isUpdatingPayment && styles.enterButtonDisabled]}
              onPress={handlePayAmountEnter}
              disabled={isUpdatingPayment}
            >
              {isUpdatingPayment ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.enterButtonText}>Enter</Text>
              )}
            </TouchableOpacity>
            
            {!isUpdatingPayment && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setPayModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            )}
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
    flexGrow: 1,
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
  // Loading, Error, Empty states
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
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
  saveButtonDisabled: {
    backgroundColor: "#A1C3F9",
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
  enterButtonDisabled: {
    backgroundColor: "#A1C3F9",
  },
  enterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    width: "100%",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#4285F4",
    fontWeight: "500",
  },
});

export default MFReceiptList;