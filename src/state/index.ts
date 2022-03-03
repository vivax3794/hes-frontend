import { ref } from "vue";
import Extension from "./extension";

class GlobalState {
  current_extension: Extension;

  constructor(inital_extension: Extension) {
    this.current_extension = inital_extension;
  }

  public static async default_state(): Promise<GlobalState> {
    const ext = await Extension.create_blank_extension();
    return new GlobalState(ext);
  }
}

const state = ref(await GlobalState.default_state());
export default state;
export { state, Extension };
