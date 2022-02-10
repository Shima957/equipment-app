import { GearLabel } from "@/types"


export const translateGearLabel = (label: GearLabel) => {
  if (label === '製品') return 'name'
  if (label === 'メーカー') return 'maker'
  if (label === '製品Url') return 'url'
}
