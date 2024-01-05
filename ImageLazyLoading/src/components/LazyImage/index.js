import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

export const LazyImage = ({ styleClass, src, alt }) => {
  const [showImage, setShowImage] = useState(false);
  const imageRef = useRef(null);

  const registerObserver = (ref, setShowImage) => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setShowImage(true);
        observer.disconnect();
      });
    });
    observer.observe(ref);
  };
  useEffect(() => {
    //Once the component is mounted we wll check for if the image is in the viewport and
    // then toggle the state so as to fetch the image
    // for each image entry this useEffect will be called
    // on each call we will register the intersection Observer
    // one for each image, if the ref of the image intersects the view the
    // image will be requested by applying src and hence making the request
    // we are not toggling opposite ie not setting to false becase using this motive
    // is to place n/w call for only those images which are in viewport
    registerObserver(imageRef.current, setShowImage);
  }, []);
  if (showImage)
    return <img className={`image-style ${styleClass}`} src={src} alt={alt} />;
  return <span ref={imageRef} className={`image-style ${styleClass}`} />;
};
