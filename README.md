<p align="center">
  <a href="https://github.com/idancali/react-native-chunky">
    <img height="256" src="https://raw.githubusercontent.com/idancali/react-native-chunky/master/logo.png">
  </a>
  <p align="center"> <b> React Native Chunky </b> Helps You Digest Your React Mobile Apps In Manageable Chunks. </p>
</p>

# React Native Chunky
[![Version](https://img.shields.io/npm/v/react-chunky.svg)](https://www.npmjs.com/package/react-native-chunky)
[![Author](https://img.shields.io/badge/say%20hi-%40idancali-green.svg)](https://twitter.com/idancali)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fidancali)

# Overview

Chunky helps you build solid React Web and Mobile apps, faster and easier. It does that by splitting up parts of your app into more manageable sections - or Chunks.

# Installation

To install React Native Chunky add the dependency to your app. Please not that it includes ```react-native``` so you don't need to add it to your app prior to installing React Native Chunky.


```javascript
npm install --save react-native-chunky
```

# Getting Started

To add React Native Chunky to your app, you need to call ```renderApp``` with the appropriate properties. Those include your app reducers, initial route, app name, custom styles and app configuration details. Here's what that would look like in practice:

```javascript
import { reducers }           from './js/data'
import { Styles as styles }   from './js/styles'
import { START_ROUTE }        from './js/routes'
import * as config            from './js/config'
import { renderApp }          from 'react-native-chunky'

renderApp({
  name: 'MyApp',
  initialRoute: START_ROUTE,
  reducers, styles, config
})
```

# Writing Chunks

After bootstrapping your React Native app as shown above, using React Chunky inside your React Native App is not much different than using it for Web apps. The core React Chunky library is platform-independent and can simply be generally used is similar fashion in both Web and Mobile apps.

Have a look at [Writing A Real-World Chunk](https://github.com/idancali/react-chunky#writing-a-real-world-chunk) for more details on what constitutes a full-blown Chunk.

# License

Copyright (c) 2016 I. Dan Calinescu

 Licensed under the The MIT License (MIT) (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://raw.githubusercontent.com/idancali/react-native-chunky/master/LICENSE

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
