// screens/ProfileScreen.js — Group A: AsyncStorage
//
// Goal: Save the user's name and daily study goal so they persist between sessions.
//
// Docs: https://docs.expo.dev/versions/latest/sdk/async-storage/

import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// TODO 1: Import AsyncStorage
// ─────────────────────────────────────────────────────────────────────────────
// Uncomment and complete the line below:
// import AsyncStorage from '...';
// ─────────────────────────────────────────────────────────────────────────────
import AsyncStorage from '@react-native-async-storage/async-storage';
const NAME_KEY = 'student_name';
const GOAL_KEY = 'daily_goal';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [savedName, setSavedName] = useState('');
  const [savedGoal, setSavedGoal] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    // TODO 2: Read the saved name and goal from AsyncStorage
    // ───────────────────────────────────────────────────────────────────────
    // Use AsyncStorage.getItem() with NAME_KEY and GOAL_KEY.
    // If values exist, update savedName and savedGoal.
    // Remember: getItem returns null if the key doesn't exist.
    // ───────────────────────────────────────────────────────────────────────
    try {
      const savedName = await AsyncStorage.getItem(NAME_KEY);
      const savedGoal = await AsyncStorage.getItem(GOAL_KEY);
      if (savedName !== null) {
        // value previously stored
        setSavedName(savedName);
      }
      if (savedGoal !== null){
        setSavedGoal(savedGoal);
      }
    } catch (e) {
      // error reading value
      console.error(e);
    }
  };

  const handleSave = async () => {
    // TODO 3: Save the current name and goal to AsyncStorage
    // ───────────────────────────────────────────────────────────────────────
    // Use AsyncStorage.setItem() for both NAME_KEY and GOAL_KEY.
    // Then update savedName and savedGoal so the UI refreshes.
    // ───────────────────────────────────────────────────────────────────────

    try {
      await AsyncStorage.setItem(NAME_KEY, name);
      await AsyncStorage.setItem(GOAL_KEY, goal);
      setSavedName(name);
      setSavedGoal(goal);
    } catch (e) {
      // saving error
      console.error(e);
    }
  };

  const handleClear = async () => {
    // TODO 4: Remove both keys from AsyncStorage
    // ───────────────────────────────────────────────────────────────────────
    // Use AsyncStorage.removeItem() on NAME_KEY and GOAL_KEY.
    // Then clear savedName and savedGoal from state.
    // ───────────────────────────────────────────────────────────────────────

    try {
      await AsyncStorage.removeItem(NAME_KEY)
      await AsyncStorage.removeItem(GOAL_KEY)
      setGoal('')
      setName('')
      setSavedGoal('')
      setSavedName('')
    } catch (e) {
      // remove error
      console.error(e);
    }
   console.log('Done.')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>SAVED PROFILE</Text>
        {savedName ? (
          <>
            <Text style={styles.cardValue}>{savedName}</Text>
            <Text style={styles.cardSub}>Goal: {savedGoal || 'None set'}</Text>
          </>
        ) : (
          <Text style={styles.cardEmpty}>No profile saved yet</Text>
        )}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Daily study goal (e.g. 2 hours)"
        value={goal}
        onChangeText={setGoal}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleClear}>
        <Text style={styles.buttonText}>Clear Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#F2F4F7' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1A1A2E' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#4A90D9' },
  cardLabel: { fontSize: 10, fontWeight: '700', color: '#999', letterSpacing: 1, marginBottom: 6 },
  cardValue: { fontSize: 18, fontWeight: 'bold', color: '#1A1A2E' },
  cardSub: { fontSize: 13, color: '#666', marginTop: 4 },
  cardEmpty: { fontSize: 14, color: '#aaa', fontStyle: 'italic' },
  input: { backgroundColor: '#fff', padding: 13, borderRadius: 10, marginBottom: 12, fontSize: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  button: { backgroundColor: '#4A90D9', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonSecondary: { backgroundColor: '#B0B0B0' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
