# Pigzbe App

## Installation

Use node version 8.10.0 (the project supports nvm).

Use yarn to manage dependencies.

Install [Android Studio](https://developer.android.com/studio/) if required.

Install react-native dependencies:

```sh
brew install watchman
yarn global add react-native-cli
```

Install project dependencies, link native libs and build the game bundle:

```sh
yarn install
```

```sh
react-native link
react-native link react-native-randombytes
```

```sh
yarn game
```

## Usage

### Run iOS App

```sh
yarn ios
```

### Run iOS App in specific simulators

```sh
yarn ipad
yarn iphoneX
yarn iphoneSE
yarn iphone8
```

### Run Android App

Open an Android simulator (or connect a physical device) before running. Configure and launch simulators from Android Studio > Tools > AVD Manager.

```sh
yarn android
```

### Run Desktop App

```sh
yarn desktop
```

## Storybook

Storybook configuration and stories are in the `/storybook` directory. Add any new stories to `/storybook/stories/` and require them in the `loadStories` function in `/storybook/index.js`.

Start storybook and then start a simulator (or physical device). Stories will run on the device, with the menu of stories loading in a browser window.

```sh
yarn storybook
yarn ios
```

## Testing

### Run Linter

```sh
yarn lint
```

### Run Tests

```sh
yarn test
```

## Content Updates

### Get latest content strings from CMS

```sh
yarn content
```

### Rebuild game bundle

```sh
yarn game
```
