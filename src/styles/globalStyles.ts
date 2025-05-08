// src/styles/globalStyles.ts
import { StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const globalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 60, // Enough space above navbar but not too much
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.darkText,
    marginBottom: theme.spacing.md,
  },
});
