const buttonSize = (size: string | undefined) => {
  if (size === 'min') return 'w-24'
  if (size === 'md') return 'w-36'
  if (size === 'lg') return 'w-96'
  if (size === undefined) return 'w-full'
}

export default buttonSize
