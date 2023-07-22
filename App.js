import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import vibrate from "./utils/vibrate";

//start timer 25, than switch to 5
//25 min = 1500 seconds, 5 mins = 300 seconds

const Timer = () => {
  const [counter, setCounter] = useState(20);
  const [switchTimer, setSwitchTimer] = useState(false);

  useEffect(() => {
    vibrate();
    let internalCounter;
    if (switchTimer) {
      internalCounter = 10;
      setCounter(10);
    } else {
      internalCounter = 20;
      setCounter(20);
    }
    const interval = setInterval(() => {
      internalCounter--;
      if (internalCounter >= 0) {
        setCounter((prevCounter) => prevCounter - 1);
      } else {
        clearInterval(interval);
        setSwitchTimer((prevState) => !prevState);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [switchTimer]);

  return <Text>{counter}</Text>;
};

export default App = () => {
  return (
    <View style={styles.container}>
      <Timer></Timer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
