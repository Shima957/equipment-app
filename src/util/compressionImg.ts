import imageCompression from "browser-image-compression"

export const compressionImg = async (img: File) => {
  const options = {
    maxSizeMB: 1,
    maxWithOrHeight: 800
  }

  const compressedImg = await imageCompression(img, options)

  return { compressedImg }
}
