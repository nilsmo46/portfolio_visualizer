'use client'; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Input } from '@/components/ui/input';
import axios from '@/lib/axios';
import Loader from '@/components/Loader';
import { baseURL } from '@/constants';

export default function Home() {
  const [modelId, setModelId] = useState('');
  const router = useRouter(); 
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const makeApiCall = async () => {
      console.log("Hello world");
      try {
        const res = await axios.get(`${baseURL}`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    makeApiCall();

    const intervalId = setInterval(makeApiCall, 3000);

    return () => clearInterval(intervalId);
  }, []); 

  const handleRedirect = () => {
    if (modelId) {
      router.push(`/backtest-portfolio?model_id=${modelId}`);
    } else {
      alert('Please enter a Model ID.');
    }
  };

        useEffect(() => {
            async function verifyLogin() {
                const token = localStorage.getItem("token");
                if (token) {
                  setLoading(true)
                    try {
                        const res = await axios.get(`${baseURL}/auth/verify`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        if (res.data) {
                            router.push("/analysis");
                        }
                    } catch (error) {
                        console.error("Verification failed:", error);
                        // localStorage.removeItem("token");
                    } finally {
                      setLoading(false)
                    }
                } else {
                  router.push("/login")
                }
            }
            verifyLogin();
        }, [router]);

        
  useEffect(() => {
    async function verifyLogin() {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true)
        try {
          const res = await axios.get(`/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (res.data) {
            router.push("/analysis");
          }
        } catch (error) {
          console.error("Verification failed:", error);
          // localStorage.removeItem("token");
        } finally {
          setLoading(false)
        }
      } else {
        router.push("/login")
      }
    }
    verifyLogin();
  }, [router]);

  if (loading) {
    return (
      <>
        <Loader customMessage="Please wait while we verify your credentials" />
      </>
    )
  }

  return (
    <>
      <div className='flex justify-center items-center h-full no-scrollbar w-xl mx-auto space-x-2 p-4'>
        <Input
          type="text"
          value={modelId}
          onChange={(e) => setModelId(e.target.value)}
          placeholder="Enter Model ID"
          className="flex-grow" 
        />
        <button 
          onClick={handleRedirect} 
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 whitespace-nowrap"
        >
          Go to Backtest Portfolio
        </button>
      </div>
    </>
  );
}