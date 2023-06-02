import React, { useEffect, useState } from "react";

const ShowImage = ({ blobImage }) => {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    let objectURL;
    if (blobImage) {
      const blob = new Blob([blobImage], { type: "image/jpg" });
      objectURL = URL.createObjectURL(blob);
      setImageURL(objectURL);
    }

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [blobImage]);

  return <img src={imageURL} alt="Blob" height={"150px"} width={"150px"} />;
};

export default ShowImage;
