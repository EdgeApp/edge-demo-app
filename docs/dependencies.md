# Installing and Configuring Dependencies

To support [`edge-core-js`](https://github.com/EdgeApp/edge-core-js) and [`edge-login-ui-rn`](https://github.com/EdgeApp/edge-login-ui-rn), we need to install a couple of dependencies:

```
yarn add disklet react-native-gesture-handler react-native-linear-gradient react-native-localize react-native-mail react-native-permissions react-native-reanimated react-native-share react-native-svg react-native-vector-icons 
```

## Native OS Configs

We need to configure iOS and Android settings to effectuate the dependencies added.

### iOS

#### Podfile
Since we use the `react-native-permissions` to handle the task of asking for and setting user permissions for iOS devices, we need to link that package to iOS files.

React Native defaults [CocoaPods](https://cocoapods.org/about) as a package manager. So, we need to add the following to the [`Podfile`](https://guides.cocoapods.org/using/the-podfile.html) located in the `ios` folder:

```ruby
 # react-native-permissions:
 permissions_path = '../node_modules/react-native-permissions/ios'
 pod 'Permission-Notifications', :path => "#{permissions_path}/Notifications"
```
Make sure you put the code above the last `end` in the file so that it actually gets executed. 

To effectuate the change you just made, at the root directory, run `(cd ios && pod install)`.

#### info.plist

The [`info.plist`](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Introduction/Introduction.html) file is how Apple handles metadata for iOS and macOS projects. 

We have installed the [`react-native-vector-icons`](https://github.com/oblador/react-native-vector-icons), and we want to add all available fonts that come with the package to the `info.plist` file so that the app can use these fonts.

The `info.plist` is located under `./ios/YourApp/`. You can simply insert the below code under `<string></string>` in the plist file.

```plist
<key>UIAppFonts</key>
<array>
	<string>AntDesign.ttf</string>
	<string>Entypo.ttf</string>
	<string>EvilIcons.ttf</string>
	<string>Feather.ttf</string>
	<string>FontAwesome.ttf</string>
	<string>FontAwesome5_Brands.ttf</string>
	<string>FontAwesome5_Regular.ttf</string>
	<string>FontAwesome5_Solid.ttf</string>
	<string>Foundation.ttf</string>
	<string>Ionicons.ttf</string>
	<string>MaterialIcons.ttf</string>
	<string>MaterialCommunityIcons.ttf</string>
	<string>SimpleLineIcons.ttf</string>
	<string>Octicons.ttf</string>
	<string>Zocial.ttf</string>
	<string>Fontisto.ttf</string>
</array>
```

### Android
#### React Native Reanimated
We use the [`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated) library for certain UI effects. To hook this library to the android project, we need to inject some codes into the default android codebase.

Navigate to `./android/app/src/main/java/com/demoedgeapp/MainApplication.java`, add these two imports:

```java
import com.facebook.react.bridge.JSIModulePackage;
import com.swmansion.reanimated.ReanimatedJSIModulePackage;
```

and add the following after the `getJSMainModuleName` method. 

```java
@Override
protected JSIModulePackage getJSIModulePackage() {
    return new ReanimatedJSIModulePackage();
}
```
Then, navigate to `./android/app/proguard-rules.pro`, and append the following:

```pro
# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }
```

Finally, in `babel.config.js`, add the following inside of the `module.exports`:
```js
plugins: ['react-native-reanimated/plugin']
```

#### build.gradle

In `./android/app/build.gradle`, find `enableHermes` and set it to `true`. This makes sure we can debug our app using the [Hermes](https://reactnative.dev/docs/hermes) engine with tools like [Flipper](https://fbflipper.com/). 

Then, add the following to the end of the file:
```gradle
// react-native-vector-icons:
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

And we are done! 