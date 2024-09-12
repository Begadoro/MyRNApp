import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserModel } from "app/models/User"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  UserStore: types.optional(UserModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
