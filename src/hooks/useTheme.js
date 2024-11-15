// src/hooks/useTheme.js
import { useContext } from 'react';
import ThemeContext from '../utils/ThemeContext';

export default function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser utilizado dentro de un ThemeProvider');
  }
  return [context.theme, context.setTheme];
}
