import { makeVar } from "@apollo/client";

export const message = makeVar("Hallo from reactive variable");
export const dataAddUserVar = makeVar([]);
export const dataBlockedUser = makeVar([]);
