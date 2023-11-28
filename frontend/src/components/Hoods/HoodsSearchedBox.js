import React from "react";
import HoodCard from "./HoodCard";

const HoodsSearchedBox = ({hoods, highlight}) => {
    return (
        <div className="cardBox">
            {hoods !== null && hoods.map((hood, index) => {
                return (
                    <HoodCard key={index} hood ={hood} highlight={highlight} />
                )
            })}
        </div>
    )
}

export default HoodsSearchedBox;