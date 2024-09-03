import axios from 'axios'
import { loginType, registerType } from '../../types'
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const vapidKey = import.meta.env.VITE_PUSH_PUBLIC_KEY;

const API_URL = `${backendUrl}/api/users/`

//Register user
const register = async (userData: registerType) => {
    const response = await axios.post(API_URL, userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login user
const login = async (userData: loginType) => {
    const response = await axios.post(API_URL+ 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//logout user
const logout = () => {
    localStorage.removeItem('user')
}

async function subscribeUser() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.error('Push notifications are not supported by your browser.');
      return;
    }
  
    const registration = await navigator.serviceWorker.ready;
  
    const existingSubscription = await registration.pushManager.getSubscription();
    if (existingSubscription) {
      return existingSubscription;
    }

    const vapidPublicKey = vapidKey;
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    try {
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });
  
      await saveSubscriptionToServer(newSubscription);
  
      console.log('User is subscribed:', newSubscription);
    } catch (error) {
      console.error('Failed to subscribe user:', error);
    }
}
  

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
//   function urlBase64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
  
//     for (let i = 0; i < rawData.length; ++i) {
//       outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
//   }
  
  
  // Save the subscription to your server
  async function saveSubscriptionToServer(subscription: any) {
    try {
        const user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')!) : null;
        if(!user) {
            throw new Error('User not found');
        }

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }
      await axios.post(`${backendUrl}/api/subscribe/`, subscription, config); // Your API endpoint to save the subscription
      console.log('Subscription saved on server');
    } catch (error) {
      console.error('Failed to save subscription to server:', error);
    }
  }

const authService = {
    register,
    logout,
    login,
    subscribeUser,
}

export default authService