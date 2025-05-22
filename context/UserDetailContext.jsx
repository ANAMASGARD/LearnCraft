
// So that user can be used in any component
// without passing it down as a prop
// This is a context for user details
// It will be used to store user details
import { createContext } from "react";
export const UserDetailContext = createContext({});