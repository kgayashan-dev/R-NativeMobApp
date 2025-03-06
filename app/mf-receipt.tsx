import Header from "@/components/Header";
import React, { useState, useMemo, useEffect } from "react";
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
  TextInput,
  ActivityIndicator,
} from "react-native";

const { width, height } = Dimensions.get("window");

type DropdownItem = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  label: string;
  data: DropdownItem[];
  onSelect: (value: string) => void;
  selectedValue: string;
  disabled?: boolean;
};

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  data,
  onSelect,
  selectedValue,
  disabled = false,
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
        style={[styles.dropdownButton, disabled && styles.disabledButton]}
        onPress={() => !disabled && setVisible(true)}
        disabled={disabled}
      >
        <Text
          style={[styles.dropdownButtonText, disabled && styles.disabledText]}
        >
          {selectedValue 
            ? data.find(item => item.value === selectedValue)?.label || selectedValue 
            : "Select an option"}
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    // If center is selected, you could auto-populate the branches based on API data
    if (center) {
      setApiStatus("loading");
      // Simulate API call
      setTimeout(() => {
        setCashierBranch("branch1");
        setLoanBranch("branchA");
        setApiStatus("success");
      }, 1000);
    }
  }, [center]);

  const handleSubmit = () => {
    if (!center) {
      setErrorMessage("Please select a center");
      return;
    }
    
    if (!searchQuery.trim()) {
      setErrorMessage("Please enter a username");
      return;
    }
    
    setErrorMessage("");
    setApiStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      console.log("Submitted:", { cashierBranch, loanBranch, center, searchQuery });
      setApiStatus("success");
      // Handle success navigation or feedback here
    }, 1500);
  };

  const cashierBranches = useMemo(
    () => [
      { label: "Branch 1", value: "branch1" },
      { label: "Branch 2", value: "branch2" },
    ],
    []
  );

  const loanBranches = useMemo(
    () => [
      { label: "Branch A", value: "branchA" },
      { label: "Branch B", value: "branchB" },
    ],
    []
  );

  const centers = useMemo(
    () => [
      { label: "Center 1", value: "center1" },
      { label: "Center 2", value: "center2" },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4285F4" barStyle="light-content" />
      <Header title="MF Receipt" showBackButton={true} />

      <View style={styles.content}>
        <Text style={styles.subHeadingtext}>
          Select the options given below to take the receipts list.
        </Text>

        <CustomDropdown
          label="Select Cashier Branch"
          data={cashierBranches}
          onSelect={setCashierBranch}
          selectedValue={cashierBranch}
          disabled={true}
        />

        <CustomDropdown
          label="Select Loan Branch"
          data={loanBranches}
          onSelect={setLoanBranch}
          selectedValue={loanBranch}
          disabled={true}
        />

        <CustomDropdown
          label="Select Center"
          data={centers}
          onSelect={setCenter}
          selectedValue={center}
        />

        <Text style={styles.label}>Search by Id, </Text>
        <TextInput
          style={[
            styles.input,
            errorMessage && styles.inputError,
            apiStatus === "loading" && styles.inputDisabled
          ]}
          placeholder="Enter your id or name"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            if (errorMessage) setErrorMessage("");
          }}
          placeholderTextColor="#888"
          autoCapitalize="none"
          editable={apiStatus !== "loading"}
        />
        
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}

        <TouchableOpacity 
          style={[
            styles.submitButton, 
            apiStatus === "loading" && styles.disabledButton
          ]} 
          onPress={handleSubmit}
          disabled={apiStatus === "loading"}
        >
          {apiStatus === "loading" ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
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
    fontSize: 14,
    fontWeight: "bold",
  },
  subHeadingtext: {
    color: "black",
    fontSize: 14,
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
    fontSize: 18,
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
    fontSize: 12,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    justifyContent: "center",
  },
  dropdownButtonText: {
    fontSize: 14,
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
    fontSize: 14,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 12,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  inputDisabled: {
    backgroundColor: "#f0f0f0",
    color: "#999",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    height: 50,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: "#ecedf1",
  },
  disabledText: {
    color: "#999",
  },
});

export default MFReceiptLogin;