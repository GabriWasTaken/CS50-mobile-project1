import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import vibrate from "./utils/vibrate";

//start timer 25, than switch to 5
//25 min = 1500 seconds, 5 mins = 300 seconds

const Timer = ({ studyTime, breakTime }) => {
  const [counter, setCounter] = useState(studyTime);
  const [switchTimer, setSwitchTimer] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let internalCounter;
    if (switchTimer) {
      if (counter != 0 && isResetting === false) {
        internalCounter = counter;
      } else {
        internalCounter = breakTime;
        setCounter(breakTime);
        setIsResetting(false);
      }
    } else {
      if (counter != 0 && isResetting === false) {
        internalCounter = counter;
      } else {
        internalCounter = studyTime;
        setCounter(studyTime);
        setIsResetting(false);
      }
    }
    const interval = setInterval(() => {
      if (!isPaused) {
        internalCounter--;
        if (internalCounter >= 0) {
          setCounter((prevCounter) => prevCounter - 1);
        } else {
          clearInterval(interval);
          vibrate();
          setSwitchTimer((prevState) => !prevState);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [switchTimer, isResetting, isPaused]);

  return (
    <View>
      <Text>{counter}</Text>
      <Button title="pause" onPress={() => setIsPaused((prevState) => !prevState)} />
      <Button title="reset" onPress={() => setIsResetting(true)} />
    </View>
  );
};

export default App = () => {
  const [isTimerStopped, setIsTimerStopped] = useState(true);
  const [studyTime, setStudyTime] = React.useState("");
  const [breakTime, setBreakTime] = React.useState("");

  return (
    <View style={styles.container}>
      {isTimerStopped ? (
        <View>
          <TextInput placeholder="study time" onChangeText={setStudyTime} value={studyTime} />
          <TextInput placeholder="break time" onChangeText={setBreakTime} value={breakTime} />
          <Button title="start pomodoro" onPress={() => setIsTimerStopped(false)}></Button>
        </View>
      ) : (
        <View>
          <Timer studyTime={studyTime} breakTime={breakTime}></Timer>
          <Button title="stop" onPress={() => setIsTimerStopped(true)} />
        </View>
      )}
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
