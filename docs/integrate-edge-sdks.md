# Integrate Edge SDKs

Now, it's time to integrate two Edge SDKs:
- [`edge-login-ui-rn`](https://github.com/EdgeApp/edge-login-ui-rn): this is a package that provides an out-of-box login/signup component.
- [`edge-core-js`](https://github.com/EdgeApp/edge-core-js): this is the engine of Edge that handles all account and wallet creation, user authentication, management of transaction data,
encryption, and synchronization across devices, learn more about it in our [white paper](https://edge.app/wp-content/uploads/2019/01/Edge-White-Paper-01-22-2019.pdf?af=edge-app-wp-admin-post-php&af=edge-app).

To begin, simply install the two SDKs:
```
yarn add edge-core-js edge-login-ui-rn
```

## Edge Login UI React Native
This package provides a wrapper [`<LoginUIProvider>`](https://github.com/EdgeApp/edge-login-ui-rn/blob/21324d47f3ea5d886b229d534fcfd84a4e01e0b7/src/components/publicApi/LoginUiProvider.tsx) that provides theming, which can be used with an out-of-box UI component [`<LoginScreen />`](https://github.com/EdgeApp/edge-login-ui-rn/blob/d1eeb350cff706c5316920df729b099dc951dd29/src/components/publicApi/PublicLoginScreen.tsx) that handles the login/signup logics.

## Edge Core
The core library provides `EdgeAccount` and `EdgeContext`, two core objects, for the entire app to consume. The [account object](https://github.com/EdgeApp/edge-core-js/blob/2b96ab85fc62873055c4910278f601209852f815/src/core/account/account-api.js#L97) has lots of properties and methods. For example, you can get the username of the current user account by referencing `edgeAccount.username`. To log out an account, call `edgeAccount.logout()`.

The [context object](https://github.com/EdgeApp/edge-core-js/blob/2b96ab85fc62873055c4910278f601209852f815/src/core/context/context-api.js#L41) manages accounts, including account creations, logins, etc.

Both `EdgeAccount` and `EdgeContext` provide `on` and `watch` properties that allow you to listen to any changes to the objects. Learn more about `on` and `watch` [here](https://github.com/EdgeApp/yaob#watching-properties).

## UI

Basically, we need to wrap our whole app with a `LoginUIProvider` component to use the `LoginScreen` component.

Inside `LoginUIProvider`, we want to inject the `MakeEdgeContext` component to make the Edge context and account available to the rest of the app.

In `./src/App.tsx`, replace everything with:

```js
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
```js
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

  return (
    <SafeAreaView style={{ alignItems: 'center' }}>
      <Text>Username: {edgeAccount.username}</Text>
      <Button title="Log Out" onPress={onLogout} />
    </SafeAreaView>
  )
}

export default MainUI
```

At the root directory, run `(cd ios && pod install)` to effectuate these changes for the iOS project.

That is it! You can now build and test the app.
