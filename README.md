# Lesson 7 – DIY Activity: On-Device Storage

## The Challenge

You're going to build a small React Native app that **remembers something between sessions**.

When you close and reopen the app, the data should still be there.

Your group has been assigned one storage method. Follow the steps below — the documentation links appear exactly where you need them.

---

## Step 1 — Understand Your Options

Before diving into your group's method, read the overview of all storage options available in Expo:

> 📄 [Store data – Expo Documentation](https://docs.expo.dev/develop/user-interface/store-data/)

As a group, discuss: why would you choose your assigned method over the others?

---

## Step 2 — Set Up Your Project

```bash
npx create-expo-app lesson7-storage
cd lesson7-storage
npx expo start
```

---

## Step 3 — Install & Implement

Follow the instructions for your assigned group below.

---

### 🟦 Group A — AsyncStorage

AsyncStorage is a simple key-value store. Everything is unencrypted and stored as a string.

**Install**

> 📄 [AsyncStorage – Installation](https://docs.expo.dev/versions/latest/sdk/async-storage/)

**Understand how it works**

Before writing any code, read through the usage guide to understand how to store and retrieve values:

> 📄 [AsyncStorage – Usage](https://react-native-async-storage.github.io/2.0/Usage/)

**Look up the methods you'll need**

When you're ready to write code, use the API reference to find the exact function names and parameters:

> 📄 [AsyncStorage – API Reference](https://react-native-async-storage.github.io/2.0/API/)

As a group, answer these before coding:
- What function saves a value? What arguments does it take?
- What function reads a value back?
- What does it return if the key doesn't exist?
- Can it store objects directly, or only strings?

**Build It**

Create an app where the user can type a value, save it, and see it loaded automatically when the app reopens. There should also be a way to clear the saved value.

> 💡 All AsyncStorage methods return Promises — you'll need `async/await`. Think about which hook lets you run code when the component first loads.

---

### 🟨 Group B — SecureStore

SecureStore encrypts data before writing it to disk. It uses the device's native security layer — Keychain on iOS, Keystore on Android.

**Install**

> 📄 [SecureStore – Installation](https://docs.expo.dev/versions/latest/sdk/securestore/#installation)

**Understand how it works and look up the methods**

The SecureStore page covers usage and the full API in one place. Read through it before writing any code — pay attention to the platform differences section:

> 📄 [SecureStore – Usage & API Reference](https://docs.expo.dev/versions/latest/sdk/securestore/)

As a group, answer these before coding:
- What function saves a value? What function reads it back? What function deletes it?
- What is the maximum size of a stored value?
- What happens on Android if the device has no screen lock set?
- How is the import statement different from AsyncStorage?

**Build It**

Simulate an auth flow: the user types a token (any string), saves it, and when the app reopens, the app shows whether a token exists. There should be a logout button that deletes the token.

> 💡 The 2 KB size limit is real. What happens if you try to store something larger? Try it and see the error.

---

### 🟩 Group C — expo-sqlite

SQLite is a full relational database stored on the device. You write SQL queries to insert and retrieve data.

**Install**

> 📄 [expo-sqlite – Installation](https://docs.expo.dev/versions/latest/sdk/sqlite/#installation)

**Understand how it works**

Start with the usage guide — it walks through opening a database, creating a table, and querying data with real code examples:

> 📄 [expo-sqlite – Usage](https://docs.expo.dev/versions/latest/sdk/sqlite/#usage)

**Look up the methods you'll need**

Once you understand the pattern, use the API reference to find the specific functions for running queries:

> 📄 [expo-sqlite – API Reference](https://docs.expo.dev/versions/latest/sdk/sqlite/#api)

As a group, answer these before coding:
- What function opens (or creates) a database synchronously?
- What sync function runs a statement that doesn't return rows (like CREATE TABLE or INSERT)?
- What sync function retrieves all rows from a SELECT query?
- What are `?` placeholders and why use them instead of string interpolation?

**Build It**

Create an app that stores short notes in a SQLite table. The user can add a note and see all saved notes listed — even after closing and reopening the app.

> 💡 Use the **synchronous** methods throughout — `openDatabaseSync`, `execSync`, `runSync`, `getAllSync`. No `async/await` needed.

> 💡 You must create the table before inserting into it. Look for the `CREATE TABLE IF NOT EXISTS` pattern in the usage guide.

---

### 🟧 Group D — expo-file-system

FileSystem gives you direct access to the device's file storage. You read and write raw files — text, JSON, images, anything.

**Install**

> 📄 [expo-file-system – Installation](https://docs.expo.dev/versions/latest/sdk/filesystem/#installation)

**Understand where you can write files**

Before writing any code, read the overview to understand the new class-based API and which directories are available:

> 📄 [expo-file-system – Overview & Directories](https://docs.expo.dev/versions/latest/sdk/filesystem/)

**Look up the methods you'll need**

Then use the API reference to find the read and write methods on the `File` class:

> 📄 [expo-file-system – API Reference](https://docs.expo.dev/versions/latest/sdk/filesystem/#api)

As a group, answer these before coding:
- How do you import `File` and `Paths`? (hint: it's a named import, not `import *`)
- What is `Paths.document` and why use it?
- How do you create a `File` instance pointing to a specific filename?
- How do you check if the file already exists before reading?
- What method reads the file content as a string synchronously?
- What method writes a string to the file?

**Build It**

Create an app where the user types a note, saves it to a `.txt` file, and the note loads automatically when the app opens.

> 💡 Check `file.exists` before reading — the file won't be there on first launch. If it doesn't exist, call `file.create()` before writing.

---

## Step 4 — Test It

1. Type something and save it
2. Close the app completely in Expo Go
3. Reopen it
4. Does your saved value appear?

If yes — you're done. If not — check whether you're reading from storage when the component first mounts.

---

## Share with the Class

Be ready to show:

- A quick demo of your working app
- The key lines that handle **saving** and **loading**
- One thing that surprised you, tripped you up, or wasn't obvious from the docs