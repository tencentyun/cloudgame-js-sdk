import React from 'react';
import { createRoot } from 'react-dom/client';
import { AndroidInstancePage } from './android_instance/AndroidInstance';

import 'tdesign-react/es/style/index.css';
import './global.css';
import './app.scss';

const root = createRoot(document.getElementById('android-instance-root'));
root.render(<AndroidInstancePage />);
