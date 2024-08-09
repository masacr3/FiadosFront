import { useState, useEffect } from "react";

function Tamanioviewport() {
	const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  return (
    <div className="fixed-top-left">
			<div className="stroke">width :{width}</div>
			<div className="stroke">height : {height}</div>
		</div>
  )
}

export default Tamanioviewport