import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { StyleSheet, useColorScheme, View } from 'react-native';
// import * as SecureStorage from "expo-secure-store"

import Events from '../../components/Events';
import ProjectList from '../../components/ProjectList';
import { calc } from '../../utils/getResponsive';

const client = new QueryClient({

})


export default function Index() {
  const theme = useColorScheme()

  return (

    <QueryClientProvider client={client}>
      {/* <Text>{data}</Text> */}
      <View style={[{ height: calc(150, "height") }, theme === "dark" && { backgroundColor: "rgba(0, 0, 0, 0.85)" }]}>
        <Events />
      </View>
      <View style={[styles.container, theme === "dark" && { backgroundColor: "rgba(0, 0, 0, 0.85)" }]}>
        <ProjectList />
      </View>
    </QueryClientProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    // backgroundColor: "red"
  },
  event: {
    height: calc(100, "height")
  }
});