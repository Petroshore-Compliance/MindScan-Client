export const getOptimizedUrl = (publicId, options = {}) => {
  const cloudName = "petroshore";

  let transformations = ["f_auto", "q_auto"];

  if (options.width) {
    transformations.push(`w_${options.width}`);
  }
  if (options.height) {
    transformations.push(`h_${options.height}`);
  }
  if (options.crop) {
    transformations.push(`c_${options.crop}`);
  }
  if (options.effect) {
    transformations.push(`e_${options.effect}`);
  }
  // Agrega más transformaciones si es necesario

  const transformationString = transformations.join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
};
