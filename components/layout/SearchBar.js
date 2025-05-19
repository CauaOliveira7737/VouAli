import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (onSearch) onSearch(query);
  };

  return (
    <TextInput
      placeholder="Buscar por localização"
      placeholderTextColor="#c2c2c2"
      value={query}
      onChangeText={setQuery}
      style={[styles.input, isFocused && styles.inputFocused]}
      returnKeyType="search"
      onSubmitEditing={handleSubmit}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      underlineColorAndroid="transparent"
      color="#000"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#c2c2c2',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
    fontSize: 14,
    width: '65%',
    minHeight: 60,
    maxHeight: 60,
    alignSelf: 'center',
    marginTop: -35,
    zIndex: 1,
    includeFontPadding: false,
    textAlignVertical: 'center',
    color: '#000',
    paddingLeft: 8
  },
  inputFocused: {
    borderColor: '#000',
    borderWidth: 2,
    color: '#000',
    outlineStyle: 'none',
  },
});

export default SearchBar;
