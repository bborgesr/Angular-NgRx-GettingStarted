import { UserState } from "../user/state/user.reducer";

export interface State {
  // products: ProductState; can't be done here, because it's lazy loaded
  user: UserState;
}
