import React from "react";
import {Link, Outlet, Route, Routes, useMatch} from "react-router-dom";
import ProduitList from "../components/produits/ProduitList";
import ProduitForm from "../components/produits/ProduitForm";
import ProduitEditForm from "../components/produits/ProduitEditForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faPlus} from "@fortawesome/free-solid-svg-icons";

const Produit = () => {
    return(
        <div>
            <nav>
                <ul className="text-end menu">
                    <li>
                        <div className="sticky-top text-end mt-5 animate__animated animate__shakeX">
                            <Link to="" className="btn-list">
                                <FontAwesomeIcon icon={faList} size="lg" /> Liste des produits
                            </Link>
                        </div>
                    </li>
                </ul>

            </nav>
            <Routes>
                <Route exact path="/" element={<ProduitList/>} />
                <Route path="/ajouter" element={<ProduitForm/>}/>
                <Route path="/:id/modifier" element={<ProduitEditForm/>}/>
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


export {Produit};