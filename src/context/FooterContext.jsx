'use client'

import { createContext, useState } from "react";

export const FooterContext= createContext();
export const DisplayFooterProvider=({children})=>{
    
  const [isDisplayFooter,setDisplayFooter] = useState(true);

  return (
    <FooterContext.Provider value={{ isDisplayFooter, setDisplayFooter }}>
      {children}
    </FooterContext.Provider>
  );
}