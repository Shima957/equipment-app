import { GearLabel } from "@/types"


export const translateGearLabel = (label: GearLabel) => {
  if (label === '製品') return 'product'
  if (label === 'メーカー') return 'maker'
  if (label === '製品Url') return 'webUrl'
}
