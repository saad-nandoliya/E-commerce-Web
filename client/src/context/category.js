import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CategoryContext = createContext();

export const useCategories = () => {
    return useContext(CategoryContext)
};


// const GetCategoryAPI = process.env.REACT_APP_CATEGORY_API;
const API = process.env.REACT_APP_API_URL;


export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(`${API}/category`);
            setCategories(res.data);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{ categories }}>
            {children}
        </CategoryContext.Provider>
    );
};


