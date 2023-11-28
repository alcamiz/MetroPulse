import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { searchModels } from "../utils/api";
import Loading from "../components/Loading";
import '../styles/SearchAll.css'
import CentersSearchedBox from "../components/Centers/CentersSearchedBox"
import HoodsSearchedBox from "../components/Hoods/HoodsSearchedBox"
import MedicalsSearchedBox from "../components/Medicals/MedicalsSearchedBox"


const SearchPage = () => {
    const [currentSearchModel, setCurrentSearchModel] = useState("centers")
    const [loading, setLoading] = useState(true)
    const [centers, setCenters] = useState(null)
    const [hoods, setHoods] = useState(null);
    const [hospitals, setHospitals] = useState(null);
    
    const {search_term} = useParams();

    useEffect(() => {
        const fetchSearchResults = async () => {
            const data =  await searchModels(search_term)
            console.log(data['neighborhoods'])
            setCenters(data["centers"])
            setHoods(data['neighborhoods'])
            setHospitals(data["hospitals"])
            setLoading(false)
        };
        fetchSearchResults();
    }, [search_term]);

    const handleModelSwitch = (modelName) => {
        setCurrentSearchModel(modelName)
    }

    const renderModelContent = () => {
        let content = null;

        switch(currentSearchModel) {
            case "centers":
                content = centers && centers["data"].length > 0 ? (
                    <CentersSearchedBox centers={centers["data"]} highlight={search_term} />
                ) : (
                    <p className="no-results">No Test Centers found.</p>
                );
                break;
            case "neighborhoods":
                content = hoods && hoods["data"].length > 0 ? (
                    <HoodsSearchedBox hoods={hoods["data"]} highlight={search_term} />
                ) : (
                    <p className="no-results">No Neighborhoods found.</p>
                );
                break;
            case "hospitals":
                content = hospitals && hospitals["data"].length > 0 ? (
                    <MedicalsSearchedBox medicals={hospitals["data"]} highlight={search_term} />
                ) : (
                    <p className="no-results">No Hospitals found.</p>
                );
                break;
            default:
                content = <p className="no-results">Please select a category.</p>;
        }

        return content;
    }

    return (
        <React.Fragment>
            {loading && <Loading />}
            {!loading && (
                <div className="column-layout">
                    <div className="column-buttons">
                        <button
                            className={currentSearchModel == "centers" ? "active": ""}
                            onClick={() => handleModelSwitch("centers")}
                        >
                        Test Centers
                        </button>
                        <button
                            className={currentSearchModel == "neighborhoods" ? "active":""}
                            onClick={() => handleModelSwitch("neighborhoods")}
                            >
                        Neighborhoods
                        </button>
                        <button
                            className={currentSearchModel == "hospitals" ? "active":""}
                            onClick={() => handleModelSwitch("hospitals")}
                            >
                        Hospitals
                        </button>
                    </div>
                    <div className="search-tab-content">{renderModelContent()}</div>
                </div>
            )}
        </React.Fragment>
    )
};

export default SearchPage
