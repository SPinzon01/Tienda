import { Capacitor } from '@capacitor/core';

const getBaseUrl = () => {
  const platform = Capacitor.getPlatform();

  if (platform === 'android') {
    return 'http://10.0.2.2:4000/api';
  }
  
  if (platform === 'ios') {
    return 'http://192.168.80.12:4000/api'; 
  }

  return 'http://localhost:4000/api';
};

const BASE_URL = getBaseUrl();

export default BASE_URL;