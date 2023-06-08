import React, {useState} from "react";

const VenteForm = ({ produits, onVenteSubmit}) => {
    const [produitId, setProduitId] = useState('');
    const [montant, setMontant] = useState('');
    const [benefice, setBenefice] = useState('');
    const [venteList, setVenteList] = useState([]);

    // Liste des produits concernes par la vente
    const getProduitNom = (produitId) => {
        const produit = produits.find((produit) => produit.id === produitId);
        return produit ? produit.nom : "";
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log('cliquer vente')

        const vente = {
            produitId,
            montant: Number(montant),
            benefice: Number(benefice),
            reste: Number(montant) - Number(benefice)
        };

        setVenteList([...venteList, vente])
        console.log(getProduitNom(vente.produitId)  );

        onVenteSubmit(vente);

        setProduitId('')
        setMontant('')
        setBenefice('')
    };

    return(
        <div>
            <div className="card">
                <div className="card-header">
                    <h6 className="card-title">Ajouter une vente</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-2">
                            <div className="col-12">
                                <label htmlFor="">Produit:</label>
                                <select
                                    value={produitId}
                                    onChange={(event) => setProduitId(event.target.value)}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Sélectionner un produit</option>
                                    {produits.map((produit) =>(
                                        <option key={produit.id} value={produit.id}>{produit.nom}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="">Montant vente:</label>
                                <input
                                    type="number"
                                    value={montant}
                                    onChange={(event) => setMontant(event.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="">Bénéfice vente</label>
                                <input
                                    type="number"
                                    value={benefice}
                                    onChange={(event) => setBenefice(event.target.value)}
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col-12 mt-3">
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-secondary btn-sm">Ajouter</button>
                                </div>

                            </div>
                        </div>
                    </form>
                    <div className="listVentes mt-5">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Produits</th>
                                <th>Montant</th>
                                <th>Benefice</th>
                                <th>Reste</th>
                            </tr>
                            </thead>
                            <tbody>
                            {venteList.map((vente, index) =>(
                                <tr key={index}>
                                    <td>{getProduitNom(vente.produitId)}</td>
                                    <td>{vente.montant}</td>
                                    <td>{vente.benefice}</td>
                                    <td>{vente.reste}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default VenteForm;