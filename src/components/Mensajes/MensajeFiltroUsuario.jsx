function MensajeFiltroUsuario() {
  const texto = "Los usuarios no tienen permitido empezar con numeros ni espacios en blanco ni terminar con espacios en blanco"
  return (
    <div className="mensaje-warning">
        <p>{texto}</p>
    </div>
    
  )
}

export default MensajeFiltroUsuario