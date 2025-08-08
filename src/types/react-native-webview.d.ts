// Type definitions for React Native WebView integration

interface ReactNativeWebView {
  postMessage(message: string): void;
}

interface Window {
  ReactNativeWebView?: ReactNativeWebView;
}