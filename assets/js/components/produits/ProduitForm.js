import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ProduitForm = () => {
    const [nom, setNom] = useState('');
    const [prix, setPrix] = useState('');

    const navigate = useNavigate();
    
    const handleSubmit = event => {
        event.preventDefault();

        const produit = {
            nom: nom,
            prix: parseInt(prix, 10)
        };
        // console.log('creation')

        axios
            .post('/api/produits/', produit)
            .then(response =>{
                if (response.status === 201){
                    setNom('');
                    setPrix('');
                    alert('Produit crée avec succès');
                    navigate('/produits')
                } else {
                    alert('Erreur lors de la création du prix')
                }
            })
            .catch(error => console.log(error));
    };

    return(
        <div>
            <h2 className="titre-page mt-3">Nouveau produit</h2>
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
                    <button type="submit" className="btn btn-primary">Ajouter</button>
                </div>

            </form>
        </div>
    )
}

export default ProduitForm;