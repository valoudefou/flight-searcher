import { useState } from 'react';
import { StyleSheet, TextInput, Button, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useFlagship } from "@flagship.io/react-sdk";

export default function TabTwoScreen() {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [isContextSubmitted, setIsContextSubmitted] = useState(false);
  const { updateContext } = useFlagship();

  const handleSubmit = () => {
    if (!key.trim()) {
      alert('Please enter a key');
      return;
    }

    if (!value.trim()) {
      alert('Please enter a value');
      return;
    }

    console.log(`Key: ${key}, Value: ${value}`);
    setIsContextSubmitted(true);
    updateContext({ [key]: value });

    // Reset inputs and hide the message after 4000ms
    setTimeout(() => {
      setKey('');
      setValue('');
      setIsContextSubmitted(false);
    }, 4000);
    Keyboard.dismiss(); // Dismiss the keyboard after submission
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
        headerImage={
          <IconSymbol
            size={310}
            color="#808080"
            name="chevron.left.forwardslash.chevron.right"
            style={styles.headerImage}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Context</ThemedText>
        </ThemedView>
        <ThemedText>To activate a flag, type a key and value, then press Send.</ThemedText>

        {/* Display the context submission message */}
        {isContextSubmitted && <ThemedText>Context is submitted!</ThemedText>}

        {/* Input fields and Send button */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a key (e.g., 'userRole')"
            value={key}
            onChangeText={setKey}
          />
          <TextInput
            style={styles.input}
            placeholder="Type a value (e.g., 'admin')"
            value={value}
            onChangeText={setValue}
          />
          <Button title="Send" onPress={handleSubmit} />
        </View>
      </ParallaxScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    fontSize: 15,
    borderColor: '#999999',
  },
});
