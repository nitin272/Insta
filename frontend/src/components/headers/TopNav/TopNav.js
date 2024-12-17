import React from "react";
import { FaSearch } from "react-icons/fa";
import UserSearch from "../../UserSearch/UserSearch";

const TopNav = ({openLogOutModal})=>{
    return(
        <div className="w-full h-auto flex items-center justify-center bg-ligh">
            <div className="relative w-full py-2">
                <UserSearch></UserSearch>
                <button data-testid="search button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaSearch></FaSearch>
                </button>
            </div>
            <button className="bg-red-500 ml-2 px-4 py-2 text-white rounded cursor-pointer hover:bg-red-600" onClick={openLogOutModal}>Logout</button>
        </div>
    )
}
export default TopNav