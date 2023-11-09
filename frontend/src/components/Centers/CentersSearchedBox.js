import React from "react";
import CenterCard from "./CenterCard";

const CentersSearchedBox = ({centers, highlight}) => {
    return (
        <div className="cardBox">
            {centers !== null && centers.map((center, index) => {
                return (
                    <CenterCard key={index} center ={center} highlight={highlight} />
                )
            })}
        </div>
    )
}

export default CentersSearchedBox;