'use client';
import { createContext, useContext, useState } from 'react';

const ContentContext = createContext<Contact | undefined>(undefined);

function Context({ children }: { children: React.ReactNode }) {
  const [update, setUpdate] = useState<Contact | undefined>(undefined);
  return <ContentContext.Provider value={{ update, setUpdate }}>{children}</ContentContext.Provider>;
}

export default Context;

export const ContextValue = () => useContext(ContentContext);
