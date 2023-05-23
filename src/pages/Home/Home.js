// import React from "react";
// import Header from "../../components/User/Header/Header";
// import Navbar from "../../components/User/Navbar/Navbar";

// const Home = ( )=> {

//     return (
//         <>
//             <Header />
//             <Navbar />
//             Trang chủ
//         </>
//     )
// }

// export default Home;

import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';

const Home = () => {
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'your_upload_preset_here');
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dsx1pj1hm/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await response.json();
    setImageUrl(file.secure_url);
  };

  return (
    <CloudinaryContext cloudName="your_cloud_name_here">
      <div>
        <input type="file" onChange={handleUpload} />
        <Image
          cloudName="your_cloud_name_here"
          publicId={imageUrl}
          width="300"
          crop="scale"
        />
      </div>
    </CloudinaryContext>
  );
};

export default Home;