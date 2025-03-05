import Header from "@/components/Header";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
  FlatList,
  Dimensions,
  ListRenderItem,
} from "react-native";

const { width, height } = Dimensions.get("window");

// Define types for the dropdown data
type DropdownItem = {
  label: string;
  value: string;
};

// Define props for the CustomDropdown component
type CustomDropdownProps = {
  label: string;
  data: DropdownItem[];
  onSelect: (value: string) => void;
  selectedValue: string;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  data,
  onSelect,
  selectedValue,
}) => {
  const [visible, setVisible] = useState(false);

  const renderItem: ListRenderItem<DropdownItem> = ({ item }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        onSelect(item.value);
        setVisible(false);
      }}
    >
      <Text style={styles.dropdownItemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedValue || "Select an option"}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const MFReceiptLogin: React.FC = () => {
  const [cashierBranch, setCashierBranch] = useState<string>("");
  const [loanBranch, setLoanBranch] = useState<string>("");
  const [center, setCenter] = useState<string>("");

  const handleSubmit = () => {
    console.log("Submitted:", { cashierBranch, loanBranch, center });
  };

  const cashierBranches: DropdownItem[] = [
    { label: "Branch 1", value: "branch1" },
    { label: "Branch 2", value: "branch2" },
  ];

  const loanBranches: DropdownItem[] = [
    { label: "Branch A", value: "branchA" },
    { label: "Branch B", value: "branchB" },
  ];

  const centers: DropdownItem[] = [
    { label: "Center 1", value: "center1" },
    { label: "Center 2", value: "center2" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      {/* Reusable Header */}
      <Header
        title="MF Receipt"
        // onProfilePress={handleProfilePress}
        showBackButton={true}
      />

      <View style={styles.content}>
        {/* <Text style={styles.welcomeText}>Welcome Admin!</Text> */}
        <Text style={styles.subHeadingtext}>
          Select the options given below to take the receipts list.
        </Text>

        <CustomDropdown
          label="Select Cashier Branch"
          data={cashierBranches}
          onSelect={setCashierBranch}
          selectedValue={cashierBranch}
        />

        <CustomDropdown
          label="Select Loan Branch"
          data={loanBranches}
          onSelect={setLoanBranch}
          selectedValue={loanBranch}
        />

        <CustomDropdown
          label="Select Center"
          data={centers}
          onSelect={setCenter}
          selectedValue={center}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
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
  header: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "18%",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 14, // Reduced font size
    fontWeight: "bold",
  },
  subHeadingtext: {
    color: "black",
    fontSize: 14, // Reduced font size
    paddingVertical: 25,
    fontWeight: "300",
  },
  profileIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    color: "#4285F4",
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 18, // Reduced font size
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  dropdownContainer: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    color: "#333",
    fontSize: 12, // Reduced font size
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    justifyContent: "center",
  },
  dropdownButtonText: {
    fontSize: 14, // Reduced font size
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 10,
    maxHeight: height * 0.5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 14, // Reduced font size
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14, // Reduced font size
  },
});

export default MFReceiptLogin;