// screens/NotesScreen.js — Group D: expo-file-system
//
// Goal: Save a free-form study note to a text file on the device.
//       The note should be loaded from the file automatically when the app opens.
//
// Docs:
//   Overview & directories → https://docs.expo.dev/versions/latest/sdk/filesystem/
//   API reference          → https://docs.expo.dev/versions/latest/sdk/filesystem/#api

import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

// TODO 1: Uncomment the import below
import { File, Paths } from 'expo-file-system';

// TODO 2: Create a File reference for your notes file
// ─────────────────────────────────────────────────────────────────────────────
// The new API uses a File class instead of a path string.
// Paths.document is the safe directory your app can write to.
// Uncomment the line below:
//
const notesFile = new File(Paths.document, 'study-notes.txt');
// ─────────────────────────────────────────────────────────────────────────────

export default function NotesScreen() {
  const [notes, setNotes]         = useState('');
  const [saved, setSaved]         = useState('');
  const [lastSaved, setLastSaved] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = () => {
    // TODO 3: Read the file if it exists
    // ───────────────────────────────────────────────────────────────────────
    // Check notesFile.exists before reading — the file won't be there on first launch.
    // If it exists, read its content using notesFile.textSync().
    // Update both notes and saved with the content.
    // ───────────────────────────────────────────────────────────────────────
    if (notesFile.exists) {
      const result = notesFile.textSync()
      setNotes(result);
      setSaved(result);
}
  };

  const handleSave = () => {
    // TODO 4: Write the current notes value to the file
    // ───────────────────────────────────────────────────────────────────────
    // If the file doesn't exist yet, call notesFile.create() first.
    // Then write using notesFile.write(notes).
    // After saving, update saved and set lastSaved to new Date().toLocaleTimeString().
    // ───────────────────────────────────────────────────────────────────────
    if(!notesFile.exists){
      notesFile.create();
    }
      notesFile.write(notes);
      setSaved(notes);
      setLastSaved(new Date().toLocaleTimeString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Study Notes</Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>LAST SAVED</Text>
        <Text style={styles.cardValue} numberOfLines={3}>
          {saved || 'Nothing saved yet'}
        </Text>
        {lastSaved ? <Text style={styles.cardTime}>Saved at {lastSaved}</Text> : null}
      </View>

      <TextInput
        style={styles.textArea}
        placeholder="Write your notes here..."
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Notes</Text>
      </TouchableOpacity>

      <Text style={styles.note}>
        💡 Your file lives inside Paths.document — a private directory for your app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 24, backgroundColor: '#F2F4F7' },
  title:      { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1A1A2E' },
  card:       { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: '#4A90D9' },
  cardLabel:  { fontSize: 10, fontWeight: '700', color: '#999', letterSpacing: 1, marginBottom: 6 },
  cardValue:  { fontSize: 14, color: '#333', lineHeight: 20 },
  cardTime:   { fontSize: 11, color: '#aaa', marginTop: 6, fontStyle: 'italic' },
  textArea:   { backgroundColor: '#fff', padding: 13, borderRadius: 10, marginBottom: 14, fontSize: 15, height: 150, borderWidth: 1, borderColor: '#E0E0E0' },
  button:     { backgroundColor: '#4A90D9', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  note:       { marginTop: 16, fontSize: 11, color: '#aaa', lineHeight: 18, fontStyle: 'italic' },
});