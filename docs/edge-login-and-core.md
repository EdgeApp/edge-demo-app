# Integrate Edge SDKs

Now, it's time to implement two Edge SDKs:
- `edge-login-ui-rn`: this is a package that provides an out-of-box login/signup component.
- `edge-core-js`: this is the engine of Edge that handles all account and wallet creation, user authentication, management of transaction data,
encryption, and synchronization across devices, learn more about it in our [white paper](https://edge.app/wp-content/uploads/2019/01/Edge-White-Paper-01-22-2019.pdf?af=edge-app-wp-admin-post-php&af=edge-app).

To begin, simply install the two SDKs:
```
yarn add edge-core-js edge-login-ui-rn 
```

## UI

Basically, we need to wrap our whole app with a `LoginUIProvider` component to use the `LoginScreen` component.

Inside `LoginUIProvider`, we want to inject the `MakeEdgeContext` component to make the Edge context and account available to the rest of the app. 

In `./src/App.tsx`, replace everything with:

```ts
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
```

The `MainUI` is basically what your app looks like after the user has logged in.

Let's create a `MainUI.tsx` under `src`, and fill it with:
```ts
import { EdgeAccount } from 'edge-core-js'
import * as React from 'react'
import { Button, SafeAreaView, Text } from 'react-native'

interface Props {
  edgeAccount: EdgeAccount
  onLogout: () => void
}

/**
 * The "inner" app view once a user is logged in.
 */
const MainUI = (props: Props) => {
  const { edgeAccount, onLogout } = props

  // We expect to have an Ethereum wallet in the account:
  const walletInfo = edgeAccount.getFirstWalletInfo('wallet:ethereum')

  // Create an Ethereum wallet at login if we don't have one:
  React.useEffect(() => {
    if (walletInfo == null)
      edgeAccount.createCurrencyWallet('wallet:ethereum', {
        name: 'My First Wallet',
        fiatCurrencyCode: 'iso:USD'
      })
  }, [edgeAccount])

  // Watch the list of loaded wallets.
  // Wallets begin loading after the login is complete,
  // so it always takes time for our wallet to appear:
  const [wallets, setWallets] = React.useState(edgeAccount.currencyWallets)
  React.useEffect(
    () => edgeAccount.watch('currencyWallets', setWallets),
    [edgeAccount]
  )

  // Find our wallet in the list (might not be there at first):
  const wallet = walletInfo == null ? undefined : wallets[walletInfo.id]

  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Text>Username: {edgeAccount.username}</Text>
      <Text>Wallet name: {wallet?.name}</Text>
      <Text>Wallet Balance: {wallet?.balances?.ETH}</Text>
      <Button title="Log Out" onPress={onLogout} />
    </SafeAreaView>
  )
}

export default MainUI
```

At the root directory, run `(cd ios && pod install)` to effectuate these changes for the iOS project. 

That is it! You can now build and test the app.

Note that once you've logged in, there's nothing after "Wallet name:" and "Wallet Balance:", that because we haven't integrated currency plugins into our app. We will do that in the very next step!