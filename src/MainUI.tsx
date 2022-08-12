import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Button, SafeAreaView, Text } from 'react-native'
import EdgeCoreAPI from './EdgeCoreAPI'

interface Props {
  edgeAccount: EdgeAccount
  onLogout: () => void
}

/**
 * The "inner" app view once a user is logged in.
 */
const MainUI = (props: Props) => {
  const { onLogout } = props
  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Button title="Log Out" onPress={onLogout} />
      <EdgeCoreAPI />
    </SafeAreaView>
  )
}

export default MainUI
