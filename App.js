import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Platform } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        setCountries(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={countries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        )}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonStyle={styles.selectContainer}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View style={styles.inputContainer}>
              <View style={styles.left}>
                {selectedItem ? (
                  <Text style={styles.flag}>{selectedItem.flag}</Text>
                ) : (
                  <Ionicons
                    name="md-earth-sharp"
                    color={"green"}
                    size={32}
                    style={styles.icon}
                  />
                )}

                <Text style={styles.name}>
                  {selectedItem ? selectedItem.name.common : "Select country"}
                </Text>
              </View>
              <FontAwesome name="chevron-down" color={"#444"} size={18} />
            </View>
          );
        }}
        dropdownStyle={styles.dropdown}
        renderCustomizedRowChild={(item, index) => {
          return (
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownFlag}>{item.flag}</Text>
              <Text style={styles.dropdownName}>{item.name.common}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  selectContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    width: 300,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  flag: {
    fontSize: 32,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
  },
  icon: {
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  dropdownFlag: {
    fontSize: 38,
    marginRight: 10,
  },
  dropdownName: {
    fontSize: 18,
  },
});
