import { ref } from "vue";
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

const state = ref(await GlobalState.defaultState());
export default state;
export { state, Extension };
