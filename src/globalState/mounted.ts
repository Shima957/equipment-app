import { atom } from "recoil";

const mountedState = atom({
  key: 'mountedState',
  default: false
})

export default mountedState
