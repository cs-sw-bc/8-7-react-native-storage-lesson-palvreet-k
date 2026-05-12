// screens/AccessScreen.js — Group B: SecureStore
//
// Goal: Securely save a study group passcode so it survives app restarts.
//       On load, the app should check whether a passcode is already stored.
//
// Docs: https://docs.expo.dev/versions/latest/sdk/securestore/

import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// TODO 1: Import SecureStore
// ─────────────────────────────────────────────────────────────────────────────
// SecureStore uses a namespace import. Uncomment and complete the line below:
// import * as SecureStore from '...';
// ─────────────────────────────────────────────────────────────────────────────

const PASSCODE_KEY = 'group_passcode';

export default function AccessScreen() {
  const [input, setInput]       = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [statusMsg, setStatusMsg]   = useState('Checking...');

  useEffect(() => {
    checkAccess();
  }, []);

  const checkAccess = async () => {
    // TODO 2: Read the stored passcode from SecureStore using PASSCODE_KEY
    // ───────────────────────────────────────────────────────────────────────
    // Use SecureStore.getItemAsync().
    // If a value exists → set isUnlocked to true, update statusMsg.
    // If no value exists → set isUnlocked to false, update statusMsg.
    // ───────────────────────────────────────────────────────────────────────
  };

  const handleSave = async () => {
    if (!input) return;
    // TODO 3: Save the passcode securely using PASSCODE_KEY
    // ───────────────────────────────────────────────────────────────────────
    // Use SecureStore.setItemAsync().
    // Then set isUnlocked to true, update statusMsg, and clear the input.
    // ───────────────────────────────────────────────────────────────────────
  };

  const handleClear = async () => {
    // TODO 4: Delete the passcode from SecureStore using PASSCODE_KEY
    // ───────────────────────────────────────────────────────────────────────
    // Use SecureStore.deleteItemAsync().
    // Then set isUnlocked to false and update statusMsg.
    // ───────────────────────────────────────────────────────────────────────
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Study Group Access</Text>

      <View style={[styles.statusCard, isUnlocked ? styles.unlocked : styles.locked]}>
        <Text style={styles.lockIcon}>{isUnlocked ? '🔓' : '🔒'}</Text>
        <Text style={styles.statusText}>{statusMsg}</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter a passcode"
        value={input}
        onChangeText={setInput}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Passcode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleClear}>
        <Text style={styles.buttonText}>Clear Passcode</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        💡 Each value stored in SecureStore has a 2 KB size limit.{'\n'}
        What happens if you exceed it? Try storing a very long string.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 24, backgroundColor: '#F2F4F7' },
  title:        { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1A1A2E' },
  statusCard:   { padding: 20, borderRadius: 12, marginBottom: 20, alignItems: 'center' },
  locked:       { backgroundColor: '#FDECEA', borderLeftWidth: 4, borderLeftColor: '#E57373' },
  unlocked:     { backgroundColor: '#E8F5E9', borderLeftWidth: 4, borderLeftColor: '#66BB6A' },
  lockIcon:     { fontSize: 32, marginBottom: 8 },
  statusText:   { fontSize: 14, fontWeight: '600', textAlign: 'center', color: '#333' },
  input:        { backgroundColor: '#fff', padding: 13, borderRadius: 10, marginBottom: 12, fontSize: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  button:       { backgroundColor: '#4A90D9', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  buttonSecondary: { backgroundColor: '#B0B0B0' },
  buttonText:   { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  note:         { marginTop: 16, fontSize: 12, color: '#888', lineHeight: 18, fontStyle: 'italic' },
});
