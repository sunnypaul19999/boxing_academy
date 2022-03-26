import SearchBar from "components/SearchBar/SearchBar.js";
import { useEffect } from "react";
import MainStore from "store/Main/MainStore";


export default function AdminAllStudents(props) {
    let token = () => {
        return MainStore.store.getState().token;
    }

    useEffect(() => {
        console.log(token());
    });

    return (
        <>
            <SearchBar students />
        </>
    );
}