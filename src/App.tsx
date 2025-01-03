import Logo from '../public/logo.svg'
import './App.css'
import { useEffect, useState } from "react";
import useNotification from "./hooks/useNotification";

function App() {
  const [count, setCount] = useState(0)
  const { requestPermission } = useNotification();
  const [token, setToken] = useState("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestPermission().then((token: any) => {
      console.log(token);
      setToken(token || "");
    });
  }, []);

  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={Logo} className="logo" alt="Meao logo" />
        </a>
      </div>
      <h1>{token}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

    </>
  )
}

export default App
