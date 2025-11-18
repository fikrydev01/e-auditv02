import React, { useEffect, useState } from 'react'

import { useLocation } from 'react-router';
import LoadingPage from '../components/LoadingPage';
import { ArrowBigLeft } from 'lucide-react';
import { fetchData } from '../utils/api';

const CredentialCheck = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        const getme = async () => {
          setLoading(true);
          try {
            const data = await fetchData('/auth/check_is_me');
            
            // console.log("data", data)
            setUser(data);
            setLoading(false);
          } catch (err) {
              setLoading(false);
                setUser({ status: err?.response?.status || 500 });
            } finally {
                setLoading(false);
            }
        };
        getme();
    }, [path]);

    // console.log("user", user)

    if (loading) {
        return <LoadingPage />;
    }

    if (!user || user.status !== 200) {
        return (
          <div className='absolute inset-0 flex items-center justify-center bg-blue-950'>
          <div className=" p-6 max-w-md mx-auto rounded-2xl shadow-md bg-gradient-to-r from-pink-100 via-red-100 to-orange-100 border border-red-200">
      <h2 className="text-lg font-semibold text-red-600 mb-2 text-center">
        Akses Ditolak
      </h2>
      <div className='flex items-center justify-center'>
      <img alt='ninja' src='/assets/images/ninja.png'className='w-48' />

      </div>
      <p className="text-gray-700 mb-4 text-center">
        User tidak valid atau belum login. Silakan login untuk melanjutkan.
      </p>
      <a
        href="/auth/login"
        className=" flex items-center gap-3 w-full justify-center px-4 py-2 rounded-xl bg-gradient-to-r from-pink-300 to-red-300 text-white font-medium shadow hover:shadow-lg transition"
      >
      <ArrowBigLeft />
      Login Page
      </a>
    </div>

          </div>

        )
    }

    return children;
}

export default CredentialCheck