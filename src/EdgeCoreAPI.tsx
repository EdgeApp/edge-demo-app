import * as React from 'react'
import * as edgeCoreFunctions from 'edge-core-js'
import * as edgeLoginUIFunctions from 'edge-login-ui-rn'
import { SafeAreaView, SectionList, StatusBar, Text, StyleSheet, View } from 'react-native'


const DATA = [
  {
    title: "edge-core-js",
    data: Object.keys(edgeCoreFunctions).filter(key => !key.includes('Error'))
  },
  {
    title: "edge-login-ui-rn",
    data: Object.keys(edgeLoginUIFunctions)
  }
];

//@ts-ignore
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);



const EdgeCoreAPI = () => {
  // print everything from edgeCoreTypes

  return (
    <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    marginBottom: 50
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});


export default EdgeCoreAPI
