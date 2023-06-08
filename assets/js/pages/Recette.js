import React from "react";
import {Link, Route, Routes} from "react-router-dom";
import RecetteList from "../components/recettes/RecetteList";
import RecetteForm from "../components/recettes/RecetteForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlus} from "@fortawesome/free-solid-svg-icons";

const Recette = () => {
    return(
        <div>
            <nav>
                <ul className="text-end menu">
                    <li>
                        <div className="sticky-top text-end mt-5 animate__animated animate__shakeX">
                            <Link to="" className="btn-list">
                                <FontAwesomeIcon icon={faList} size="lg" /> Liste des recettes
                            </Link>
                        </div>
                    </li>
                </ul>

            </nav>

            <Routes>
                <Route exact path="/" element={<RecetteList/>}/>
                <Route path="/ajouter" element={<RecetteForm/>}/>
            </Routes>

            {/* Icone "Ajout de produit */}
            <div className="fixed-bottom d-flex justify-content-center mb-3">
                <Link to="ajouter" className="btn btn-primary rounded-circle btn-lg animate__animated animate__heartBeat">
                    <FontAwesomeIcon icon={faPlus}/>
                </Link>
            </div>

        </div>
    )
}

export default Recette;