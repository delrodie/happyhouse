import React, {useEffect, useState} from "react";
import axios from "axios";
import VenteForm from "../ventes/VenteForm";
import {useNavigate} from "react-router-dom";

const RecetteForm = ({onRecetteSubmit}) => {
    const [date, setDate] = useState('');
    const [ventes, setVentes] = useState([]);
    const [produits, setProduits] = useState([]);

    const navigate = useNavigate();

    useEffect(() =>{
        axios
            .get('/api/produits/')
            .then(response => setProduits(response.data))
            .catch(error => console.log(error))
    }, []);
    const handleVenteSubmit = (vente) => {
        setVentes([...ventes, vente]);

        console.log(...ventes);
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const montantTotal = ventes.reduce((total, vente) => total + vente.montant, 0);
        const beneficeTotal = ventes.reduce((total, vente) => total + vente.benefice, 0);
        const resteTotal = montantTotal - beneficeTotal;

        const recette = {
            date,
            montantTotal,
            beneficeTotal,
            resteTotal,
            ventes
        };

        console.log(recette);

        // Enregistrement des données dans la base de données via l'API Symfony
        axios
            .post("/api/recettes/", recette)
            .then((response) =>{
                console.log(response);
                if (response.status === 201){
                    setVentes([])
                    alert("Recette enregistrée avec succès")
                    // onRecetteSubmit(recette);
                    navigate('/recettes')
                }else{
                    alert("Erreur lors de l'enregistrement de la recette")
                }
            })
            .catch((errors) => console.log(errors))

        // onRecetteSubmit(recette);
    };

    return(
        <div>
            <h2 className="titre-page mt-3">Nouvelle recette</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col-6">
                        <label htmlFor="">Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            className="form-control form-control-lg"
                            required
                        />
                    </div>
                    <div className="col-6 text-center">
                        Total <br/>
                        <h2 className="montant-total">{ventes.reduce((total, vente) => total + vente.montant, 0)}</h2>
                    </div>
                </div>

                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-final">Enregistrer</button>
                </div>

            </form>
            <VenteForm produits={produits || []} onVenteSubmit={handleVenteSubmit}/>
            <p>.</p>
        </div>
    )
}

export default RecetteForm;