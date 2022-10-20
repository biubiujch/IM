import React, { ReactNode } from "react";
import { DefaultGenerics, MessageResponse } from "stream-chat/dist/types/types";

const data = {
  messages: [] as MessageResponse<DefaultGenerics>[],
  set(newdata: MessageResponse<DefaultGenerics>[]) {
    this.messages = newdata;
  },
};
export const DataContext = React.createContext(data);

export const Context = ({ children }: { children: ReactNode }) => {
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};
