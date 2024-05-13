# react-animated-loading-overlay-ts
This TS react component will display an animated loading overlay and disable user input. (JS version can be found [here](https://github.com/dqhendricks/react-animated-loading-overlay))

For a working example, view the code sandbox [here](https://codesandbox.io/p/devbox/react-animated-loading-overlay-ts-nlvx6d), or see below.

**Example usage:**

*Just feed the loading state into the LoadingOverlay using props, and place whatever visual elements you want to display in the center of the loading overlay, as children.*
```
import { useState } from 'react';
import LoadingOverlay from "./components/LoadingOverlay.tsx";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingOverlay isLoading={isLoading}>
      <p>Loading...</p>
    </LoadingOverlay>
  );
}
```
