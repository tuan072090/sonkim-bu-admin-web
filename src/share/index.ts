import AppProvider from "./context/app/app.context";
import Routers from "./routers";
import Validator from "./utils/validators";

//  services
import InsideApiService from './services/insite-api'

//  hooks
import {useLocalStorage} from "./hooks/useLocalStorage";
import {useDebounce} from "./hooks/useDebounce";

//  data type

export { AppProvider, Routers, Validator, useLocalStorage, useDebounce, InsideApiService };


//  data type
