import { useState } from "react";
import { GiH2O } from "react-icons/gi";

function InputIphone() {
    const[inputValue, setInputValue] = useState("");
    const[lucasGato, setLucasGato] = useState(false)
    const handleKeyDown = (e) => {
        if ( e.key === 'Enter') {
          // Previene el comportamiento por defecto del Enter (por ejemplo, si está dentro de un formulario)
          e.preventDefault();

          setLucasGato(true);
        }
      };
  return (
    <div>
        <input type="text"
            inputMode="numeric"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
        />
        {lucasGato && <h2>Apreto en ENTER</h2>}
    </div>
  )
}

export default InputIphone