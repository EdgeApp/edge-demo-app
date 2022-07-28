import { EdgeAccount, EdgeContext, MakeEdgeContext } from 'edge-core-js'
import { LoginScreen, LoginUiProvider } from 'edge-login-ui-rn'
import * as React from 'react'
import { Alert, Text } from 'react-native'

import MainUI from './MainUI'

/**
 * Makes the Edge context and Login UI modal provider
 * available to the rest of the app.
 */
const App = () => {
  // Stores the Edge context:
  const [edgeContext, setEdgeContext] = React.useState<EdgeContext>()
  const [edgeAccount, setEdgeAccount] = React.useState<EdgeAccount>()
  const showError = (error: unknown) =>
    Alert.alert('Error', String(error), [{ text: 'OK' }])
  const handleLogout = () => {
    edgeAccount?.logout()
    setEdgeAccount(undefined)
  }
  return (
    <LoginUiProvider>
      <MakeEdgeContext
        // Get this from our support team:
        apiKey="0b5776a91bf409ac10a3fe5f3944bf50417209a0"
        appId="com.mydomain.myapp"
        // Called when the core is done loading:
        onLoad={setEdgeContext}
        onError={showError}
      />
      {edgeContext == null ? (
        <Text>Loading...</Text>
      ) : edgeAccount == null ? (
        <LoginScreen
          accountOptions={{}}
          context={edgeContext}
          onLogin={setEdgeAccount}
        />
      ) : (
        <MainUI edgeAccount={edgeAccount} onLogout={handleLogout} />
      )}
    </LoginUiProvider>
  )
}

export default App
