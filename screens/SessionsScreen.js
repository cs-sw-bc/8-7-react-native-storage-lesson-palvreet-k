// screens/SessionsScreen.js — Group C: expo-sqlite
//
// Goal: Log study sessions (subject + duration) into a local SQLite database.
//       All sessions should reload from the database when the app restarts.
//
// Docs:
//   Usage guide → https://docs.expo.dev/versions/latest/sdk/sqlite/#usage
//   API reference → https://docs.expo.dev/versions/latest/sdk/sqlite/#api

import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// TODO 1: Uncomment the import below
// import * as SQLite from 'expo-sqlite';

// TODO 2: Create database using SQLite.openDatabaseSync('studybuddy.db')
// and save it in a constant named 'db'

export default function SessionsScreen() {
  const [subject, setSuject]    = useState('');
  const [duration, setDuration] = useState('');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    setupDatabase();
  }, []);

  const setupDatabase = () => {
    // TODO 3: Create the sessions table if it doesn't already exist
    // ───────────────────────────────────────────────────────────────────────
    // Use db.execSync() to run a CREATE TABLE IF NOT EXISTS statement.
    // The table should be called 'sessions' and have these columns:
    //   id       INTEGER PRIMARY KEY AUTOINCREMENT
    //   subject  TEXT NOT NULL
    //   duration TEXT NOT NULL
    //
    // After creating the table, call loadSessions().
    // ───────────────────────────────────────────────────────────────────────
  };

  const loadSessions = () => {
    // TODO 4: Query all rows from the sessions table
    // ───────────────────────────────────────────────────────────────────────
    // Use db.getAllSync() with a SELECT * FROM sessions statement.
    // Update the sessions state with the returned array.
    // ───────────────────────────────────────────────────────────────────────
  };

  const handleAdd = () => {
    if (!subject || !duration) return;

    // TODO 5: Insert a new row into the sessions table
    // ───────────────────────────────────────────────────────────────────────
    // Use db.runSync() with an INSERT INTO statement.
    // Pass subject and duration as parameterised values (use ? placeholders).
    // After inserting, clear both inputs and call loadSessions() to refresh the list.
    // ───────────────────────────────────────────────────────────────────────
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Study Sessions</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject (e.g. React Native)"
        value={subject}
        onChangeText={setSuject}
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (e.g. 45 min)"
        value={duration}
        onChangeText={setDuration}
      />

      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Log Session</Text>
      </TouchableOpacity>

      <Text style={styles.sectionLabel}>Logged Sessions ({sessions.length})</Text>

      <FlatList
        data={sessions}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardSubject}>{item.subject}</Text>
            <Text style={styles.cardDuration}>{item.duration}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No sessions logged yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, padding: 24, backgroundColor: '#F2F4F7' },
  title:        { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#1A1A2E' },
  input:        { backgroundColor: '#fff', padding: 13, borderRadius: 10, marginBottom: 12, fontSize: 15, borderWidth: 1, borderColor: '#E0E0E0' },
  button:       { backgroundColor: '#4A90D9', padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonText:   { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: '#999', letterSpacing: 1, marginBottom: 10 },
  card:         { backgroundColor: '#fff', padding: 14, borderRadius: 10, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderLeftWidth: 4, borderLeftColor: '#4A90D9' },
  cardSubject:  { fontSize: 15, fontWeight: 'bold', color: '#1A1A2E' },
  cardDuration: { fontSize: 13, color: '#666' },
  empty:        { textAlign: 'center', color: '#aaa', marginTop: 30, fontStyle: 'italic' },
});