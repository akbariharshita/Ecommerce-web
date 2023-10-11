import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./Productcontext";
import reducer from "../reducer/FilterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    color: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  }
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  const setListView = () => {
    return dispatch({ type: "SET_LIST_VIEW" });
  };

  const sorting = (event) => {
        let userValue = event.target.value;
        dispatch({type: "GET_SORT_VALUE", payload:userValue});
  }

  const updateFilterValue = (event) =>{
     let name = event.target.name;
     let value = event.target.value;

     return dispatch({type:"UPDATE_FILTERS_VALUE", payload: { name, value }});
  };

  const clearFilters = () => {
    dispatch({type: "CLEAR_FILTERS"})
  }

  useEffect(()=>{
    dispatch({type:"FILTER_PRODUCTS"});
    dispatch({type:"SORTING_PRODUCTS"});
  },[products, state.sorting_value, state.filters])

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGridView, setListView, sorting, updateFilterValue, clearFilters,}}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

//  setListView, sorting 
