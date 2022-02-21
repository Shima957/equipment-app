import { supabase } from "@/lib/supabase";

const createFileName = async (imgFile: File) => {
  const fileExt = imgFile.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;

  return { fileName };
}


export const uploadImg = async (imgFile: File, folder: 'gears' | 'avatar') => {
  const { fileName } = await createFileName(imgFile)
  await supabase.storage.from(folder).upload(fileName, imgFile)

  return { fileName }
}
