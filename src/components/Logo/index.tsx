import React from 'react'
import { Image, StyleSheet, View, ViewStyle } from 'react-native'

interface LogoProps {
  width?: number;
  height?: number;
  style?: ViewStyle;
}

const Logo = ({ width = 150, height = 150, style }: LogoProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={require("../../../assets/images/logo barbearia.png")}
        style={{width, height, borderRadius: 8}}
        resizeMode='contain'
      />
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 10,
  },
});