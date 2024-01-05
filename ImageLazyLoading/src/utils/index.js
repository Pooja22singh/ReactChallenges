export const registerObserver = (callback) => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      callback();
      observer.disconnect();
    });
  });
  return observer;
};
