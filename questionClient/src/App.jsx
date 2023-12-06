import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function App() {
    const [file, setFile] = useState(null);
   
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:3001/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           
            alert('File uploaded successfully!');
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <motion.div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 via-white to-sky-500 from-40%" initial={{x:'-500vw'}} animate={{x:0}} transition={{duration:2,type:'spring'}}>
            <motion.div className="bg-white p-8 rounded shadow-sky-500 shadow-xl max-w-md w-full bg-transparent hover:bg-gradient-to-bl from-cyan-400 via-white to-sky-500 from-40% " initial={{scale:0}} animate={{scale:1}} transition={{duration:.5,delay:1,type:'spring'}}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4 p-2  w-full shadow-xl shadow-sky-700"
                />
                <motion.button
                    onClick={handleUpload}
                    className="bg-gradient-to-br from-cyan-400 to-sky-500 from-40% text-white py-2 px-4 rounded hover:bg-gradient-to-br hover:from-cyan-600  hover:to-sky-800  shadow-xl shadow-sky-500"
                    whileTap={{rotateY:360}}
                >
                    Upload File
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default App;
