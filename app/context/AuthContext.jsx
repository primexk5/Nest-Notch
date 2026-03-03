'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
})

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [mounted, setMounted] = useState(false)

    // Load user from localStorage on mount to persist session
    useEffect(() => {
        setMounted(true)
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (err) {
                console.error('Failed to parse stored user', err)
            }
        }
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('currentUser', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('currentUser')
    }

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
