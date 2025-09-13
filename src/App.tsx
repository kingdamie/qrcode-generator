import { Loader } from './components/Loader'
import { useEffect, useState } from "react";
import { QRCode } from './components/QRCode';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay (e.g., fetching data)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // loader shows for 2s or until data is ready

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div>
          <QRCode />
        </div>
      )}
    </>
  )
}

export default App
