import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BottomActionProps {
  onPress: () => void;
  text?: string;
  color?: string;
}

const BottomAction: React.FC<BottomActionProps> = ({ onPress, text = 'View Detail', color = '#0047AB' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={[styles.label, { color }]}>{text}</Text>
      <Text style={[styles.label, { color }]}>{'>'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BottomAction;
