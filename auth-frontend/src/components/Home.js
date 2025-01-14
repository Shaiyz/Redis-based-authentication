import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

export default function Home() {
    const { setToken, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [message, setMessage] = useState("Signed In Successfully!");
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!user){
            setTimeout(() => navigate("/"), 3000); 

        }
    },[])

    const logout = () => {
        setToken(null);
        navigate('/');
    };

    const fetchProtectedData = async () => {
        try {
          const token = localStorage.getItem('token'); 
          if (!token) {
            setMessage('You need to log in first.');
            return;
          }
      
          const response = await fetch('http://localhost:8000/api/protected', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`, 
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json(); 
          if (response.ok) {
            setMessage(data.message || 'Data fetched successfully');
          }
          setLoading(false);
        } catch (err) {
            setMessage("Session has expired. Please log in again.");

          setToken(null); 
          setTimeout(() => navigate("/"), 3000); 
        }
      };
      

  
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProtectedData();
        }, 10000); 
        return () => clearTimeout(timer); 
    }, [user]);

    return (
        <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
            <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
                <div className="absolute left-0 top-0 -z-10 h-2/3 w-full  bg-gradient-to-t from-transparent to-[#dee7ff47] bg-gradient-to-t to-[#252A42]"></div>
                <div className="absolute bottom-17.5 left-0 -z-10 h-1/3 w-full">
                    <img
                        src="/images/shape/shape-dotted-light.svg"
                        alt="Dotted"
                        className="w-full"
                    />
                </div>

                <motion.div
                    variants={{
                        hidden: {
                            opacity: 0,
                            y: -20,
                        },
                        visible: {
                            opacity: 1,
                            y: 0,
                        },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="animate_top rounded-lg px-7.5 pt-7.5 shadow-solid-8 xl:px-15 xl:pt-15"
                >
                    <h2 className="mb-15 text-center text-3xl font-semibold text-black xl:text-sectiontitle2">
                        {user ?<> <p>Hello, {user?.username}</p> <br/>
                        Successfully Signed In!</>: <> Unauthorized Access</>}
                    </h2>

                    <div className="text-center mb-4">
                        {loading ? (
                            <></>
                        ) : (
                            <p>{message}</p>
                        )}
                    </div>

                    {user && <div className="flex justify-between items-center">
                        <button
                            onClick={logout}
                            className="w-full py-3 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Sign Out
                        </button>
                    </div>}
                </motion.div>
            </div>
        </section>
    );
}
