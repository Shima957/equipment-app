import { supabase } from "@/lib/supabase";
import { GearFormValue, UpdateProfielFormValue } from "@/types";

const createFileName = async (formData: GearFormValue | UpdateProfielFormValue) => {
  const fileExt = formData.img[0].name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;

  return { fileName };
}


export const uploadImg = async (formData: GearFormValue | UpdateProfielFormValue, folder: 'gears' | 'avatar') => {
  const { fileName } = await createFileName(formData)
  await supabase.storage.from(folder).upload(fileName, formData.img[0])

  return { fileName }
}
