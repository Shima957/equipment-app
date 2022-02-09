import { supabase } from "@/lib/supabase";

export const getPublicUrl = async (fileName: string, folder: 'gears' | 'avatar') => {
  const { data } = await supabase.storage
    .from(folder)
    .getPublicUrl(fileName);

  return { publicUrl: data?.publicURL };
};
