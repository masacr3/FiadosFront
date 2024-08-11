/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

function BotonFlotante({nombre, setActivateSearch, activateSearch}) {
  
  const inputRef = useRef(null);

    useEffect(() => {
      if (activateSearch && inputRef.current) {
        inputRef.current.focus();
      }
    }, [activateSearch]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExpandClick = () => {
    scrollToTop();
    setActivateSearch(true);
  };
  return (
      <div className="bton-flotante">
        {!activateSearch && <button className="fab" onClick={handleExpandClick}>{nombre}</button>}
    </div>
    
  )
}

export default BotonFlotante