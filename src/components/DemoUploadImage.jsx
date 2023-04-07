import React, { useState, useEffect } from "react";
import { storage } from "./firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { Button, Box, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";

const DemoUploadImage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Image Upload Success");
    });
  };

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
          console.log(url);
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
            onChange={(e) => {
              console.log(e.target.files[0]);
              setImageUpload(e.target.files[0]);
            }}
          />
        </Button>
        <Button onClick={uploadImage}>Save</Button>
        <Box>
          {imageList.map((url, index) => (
            <img src={url} alt={url} key={index} />
          ))}
        </Box>
      </Grid>
    </Box>
  );
};

export default DemoUploadImage;
