import React from 'react';
import { StatusBar } from 'expo-status-bar';
import GastosScreen from './src/screens/GastosScreen';

export default function App() {
  return (
    <>
      <GastosScreen />
      <StatusBar style="auto" />
    </>
  );
}
