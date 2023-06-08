import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";

const ProduitEditForm = () => {
    const {id} = useParams();
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');

    const navigate = useNavigate();

    useEffect(() =>{
        axios
            .get(`/api/produits/${id}`)
            .then(response =>{
                setNom(response.data.nom);
                setPrix(response.data.prix);
            })
            .catch(error => console.log(error));
    }, [id]);

    const handleSubmit = event => {
        event.preventDefault();

        const produit = {
            nom: nom,
            prix: parseInt(prix, 10)
        };

        axios
            .put(`/api/produits/${id}`, produit)
            .then(response =>{
                console.log(response)
                if (response.status === 204){
                    alert("Produit mis à jour avec succès");
                    navigate('/produits');
                }else{
                    alert("Erreur lors de la mise à jour du produit");
                }
            })
            .catch(error => console.log(error));
    };

    return(
        <div>
            <h2>Modifier le produit</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="">Nom:</label>
                    <input type="text" value={nom} onChange={event => setNom(event.target.value)} className="form-control form-control-lg" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Prix:</label>
                    <input type="number" value={prix} onChange={event => setPrix(event.target.value)} className="form-control form-control-lg"/>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">Mettre à jour</button>
                </div>

            </form>
        </div>
    )
};

export default ProduitEditForm;