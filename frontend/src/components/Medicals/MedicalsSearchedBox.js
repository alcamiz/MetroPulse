import React from "react";
import MedicalCard from "./MedicalCard";

const MedicalsSearchedBox = ({medicals, highlight}) => {
    return (
        <div className="cardBox">
            {medicals !== null && medicals.map((medical, index) => {
                return (
                    <MedicalCard key={index} medical ={medical} highlight={highlight} />
                )
            })}
        </div>
    )
}

export default MedicalsSearchedBox;