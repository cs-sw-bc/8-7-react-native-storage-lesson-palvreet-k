// App.js — Study Buddy
// Pre-written: tab navigation. No changes needed here.
//
// ─── INSTALL YOUR GROUP'S LIBRARY BEFORE STARTING ───────────────────────────
//
//   Group A – AsyncStorage:  npx expo install @react-native-async-storage/async-storage
//   Group B – SecureStore:   npx expo install expo-secure-store
//   Group C – SQLite:        npx expo install expo-sqlite
//   Group D – FileSystem:    npx expo install expo-file-system
//
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import ProfileScreen  from './screens/ProfileScreen';
import AccessScreen   from './screens/AccessScreen';
import SessionsScreen from './screens/SessionsScreen';
import NotesScreen    from './screens/NotesScreen';

const TABS = [
  { key: 'profile',  icon: '👤', label: 'Profile'  },
  { key: 'access',   icon: '🔐', label: 'Access'   },
  { key: 'sessions', icon: '📚', label: 'Sessions' },
  { key: 'notes',    icon: '📝', label: 'Notes'    },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderScreen = () => {
    switch (activeTab) {
      case 'profile':  return <ProfileScreen />;
      case 'access':   return <AccessScreen />;
      case 'sessions': return <SessionsScreen />;
      case 'notes':    return <NotesScreen />;
      default:         return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>{renderScreen()}</View>

      <View style={styles.tabBar}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.activeTab]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, activeTab === tab.key && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: '#F2F4F7' },
  screen:         { flex: 1 },
  tabBar:         { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E0E0E0', paddingBottom: 4 },
  tab:            { flex: 1, alignItems: 'center', paddingVertical: 8 },
  activeTab:      { borderTopWidth: 2, borderTopColor: '#4A90D9' },
  tabIcon:        { fontSize: 18 },
  tabLabel:       { fontSize: 11, color: '#999', marginTop: 2 },
  activeTabLabel: { color: '#4A90D9', fontWeight: '600' },
});
