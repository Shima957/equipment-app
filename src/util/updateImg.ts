import { supabase } from "@/lib/supabase"

export const updateImg = async (folder: 'gears' | 'avatar', filePath: string, fileData: File) => {
  if (folder === 'gears') {
    const pathStartIndex = filePath.search(/gears\//) + 6
    const pathEndIndex = (filePath.length - 1) + 1
    const fileName = filePath.slice(pathStartIndex, pathEndIndex)
    await supabase.storage.from(folder).update(fileName, fileData)
  } else {
    const pathStartIndex = filePath.search(/avatar\//) + 7
    const pathEndIndex = (filePath.length - 1) + 1
    const fileName = filePath.slice(pathStartIndex, pathEndIndex)
    await supabase.storage.from(folder).update(fileName, fileData)
  }
}
