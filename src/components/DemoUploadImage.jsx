import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Button, Box, Grid, Avatar } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const DemoUploadImage = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  //browser File
  const handleBroserFile = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImageUpload(imageFile);
    setPreviewImage(imageUrl);
  };

  //Button Upload File
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);

    //Upload file
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      console.log(snapshot);
      //Show file to HTML
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <Box>
      <Grid container direction="row" justifyContent="center" marginTop="50px">
        <Button variant="contained" component="label">
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleBroserFile}
          />
        </Button>
        <Button onClick={uploadImage}>Save</Button>
        <Avatar
          src={previewImage}
          sx={{ width: "50px", height: "50px" }}></Avatar>
      </Grid>
      <Box>
        {imageList.map((url, index) => (
          <Avatar
            src={url}
            alt={url}
            key={index}
            sx={{ width: "50px", height: "50px", border: "1px solid" }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DemoUploadImage;
