window.geolocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      geo => {
        resolve(geo);
      },
      error => {
        reject(error);
      }
    );
  });
};
