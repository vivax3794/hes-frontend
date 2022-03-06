import { ref, Ref } from "vue";
import { useStorage } from "@vueuse/core";
import Extension from "./extension";

class GlobalState {
  currentExtension: Extension;

  constructor(initalExtension: Extension) {
    this.currentExtension = initalExtension;
  }

  public static async defaultState(): Promise<GlobalState> {
    const ext = await Extension.createBlankExtension();
    return new GlobalState(ext);
  }
}

/* 
if running in prod use localStorage to store extension data.
we dont do this in dev mode because if we change the state class (which is likely)
we will instead load a old version from localStorage
*/
let state: Ref<GlobalState>;

if (import.meta.env.PROD) {
  state = useStorage("stateStore", await GlobalState.defaultState());
} else {
  state = ref(await GlobalState.defaultState()) as Ref<GlobalState>;
}

export default state;
export { state, Extension };
