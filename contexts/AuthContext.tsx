import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

interface AuthContextType {
    userToken: string | null;
    isLoading: boolean;
    login: (email: string, pass: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Auto-login check
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    setUserToken(token);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        checkToken();
    }, []);

    const login = async (email: string, pass: string) => {
        console.log('Attempting login with:', email);
        setIsLoading(true);
        try {
            console.log('Sending request to reqres.in via fetch...');
            const response = await fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password: pass,
                }),
            });

            const data = await response.json();
            console.log('Response received:', data);

            if (response.ok && data.token) {
                const token = data.token;
                console.log('Token found, saving...');
                setUserToken(token);
                await AsyncStorage.setItem('userToken', token);
                console.log('Token saved.');
                Toast.show({
                    type: 'success',
                    text1: 'Login Successful',
                    text2: 'Welcome back!',
                });
            } else {
                console.log('Login failed', data);
                throw new Error(data.error || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);

            // Fallback for demo purposes if network fails
            if (email === 'eve.holt@reqres.in' && pass === 'cityslicka') {
                console.log('Network failed, performing MOCK login...');
                const fakeToken = 'QpwL5tke4Pnpja7X4Mock';
                setUserToken(fakeToken);
                await AsyncStorage.setItem('userToken', fakeToken);
                Toast.show({
                    type: 'info', // Changed to info to indicate mock
                    text1: 'Login Successful (Offline Mode)',
                    text2: 'Network unavailable, using demo access.',
                    visibilityTime: 4000,
                });
                return; // Exit successfully
            }

            const msg = error.message || 'Something went wrong';
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: msg,
            });
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userToken');
            setUserToken(null);
            Toast.show({
                type: 'success',
                text1: 'Logged out',
            });
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ userToken, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
