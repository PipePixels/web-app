'use client';

import { createContext, type ReactNode, useContext, useState } from 'react';

interface CreditsContextType {
    addCredits: (amount: number) => void;
    consumeCredits: (amount: number) => void;
    credits: number;
    enableCreditSystem: boolean;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export function CreditsProvider({ children }: { children: ReactNode }) {
    const [credits, setCredits] = useState<number>(50); // Start with 50 credits

    const consumeCredits = (amount: number) => {
        setCredits((prev) => Math.max(0, prev - amount));
    };

    const addCredits = (amount: number) => {
        setCredits((prev) => prev + amount);
    };
    const value: CreditsContextType = {
        credits,
        consumeCredits,
        addCredits,
        enableCreditSystem: false,
    };

    return (
        <CreditsContext.Provider value={value}>
            {children}
        </CreditsContext.Provider>
    );
}

export function useCredits() {
    const context = useContext(CreditsContext);
    if (context === undefined) {
        throw new Error('useCredits must be used within a CreditsProvider');
    }
    return context;
}
