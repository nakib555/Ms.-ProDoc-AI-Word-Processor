import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mathlive';
import 'mathlive/fonts.css';
import 'mathlive/static.css';
import { MathfieldElement } from 'mathlive';
import App from './App';
import './index.css';

if (typeof window !== 'undefined' && typeof MathfieldElement !== 'undefined') {
  MathfieldElement.fontsDirectory = '/mathlive-fonts';
  MathfieldElement.soundsDirectory = '/mathlive-sounds';
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);