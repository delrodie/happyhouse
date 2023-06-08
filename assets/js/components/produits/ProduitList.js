import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDeleteLeft, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";

const ProduitList = () => {
    const [produits, setProduits] = useState([]);

    useEffect(() =>{
        axios.get('/api/produits/')
            .then(response => setProduits(response.data))
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/produits/${id}`)
            .then(response =>{
                if (response.status === 204){
                    alert('Produit supprimé avec succès');
                    setProduits(produits.filter(produit => produit.id !== id));
                } else {
                    alert('Erreur lors de la suppression du produit');
                }
            })
            .catch(error => console.log(error));
    };

    return (
        <div>
            <h2 className="titre-page">Liste des produits</h2>
            <table className="table table-bordered table-hover table-striped table-sm table-responsive">
                <thead>
                    <tr>
                        <th className="text-center">Nom</th>
                        <th className="text-center">Prix</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>

                {produits.map(produit =>(
                    <tr key={produit.id}>
                        <td>{produit.nom}</td>
                        <td className="text-center">{produit.prix}</td>
                        <td className="text-center">
                            <Link to={`/produits/${produit.id}/modifier`}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </Link> &nbsp; | &nbsp;
                            <button onClick={() => handleDelete(produit.id)} className="btn btn-sm">
                                <FontAwesomeIcon icon={faTrash} className="corbeille" />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ul>

            </ul>
        </div>
    )
}

export default ProduitList;