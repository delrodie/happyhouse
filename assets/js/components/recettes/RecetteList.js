import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash, faUndo} from "@fortawesome/free-solid-svg-icons";
import DataTable from 'react-data-table-component';
import recette from "../../pages/Recette";
import {useNavigate} from "react-router-dom";

const RecetteList = () => {
    const [recettes, setRecettes] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [montantTotal, setMontantTotal] = useState(0);
    const [beneficeTotal, setBeneficeTotal] = useState(0);
    const [resteTotal, setResteTotal] = useState(0);

    const navigate = useNavigate();

    useEffect(() =>{
        axios
            .get('/api/recettes/')
            .then(response => {
                setRecettes(response.data);
                calculateTotaux(response.data)
            })
            .catch(error => console.log(error));
    },[]);

    useEffect(() => {
        calculateTotaux(filteredRecettes);
    }, [filteredRecettes])

    const calculateTotaux = (recettes) => {
        let totalMontant = 0;
        let totalBenefice = 0;
        let totalReste = 0;

        recettes.forEach(recette =>{
            totalMontant += recette.montantTotal;
            totalBenefice += recette.beneficeTotal;
            totalReste += recette.resteTotal;
        });

        setMontantTotal(totalMontant);
        setBeneficeTotal(totalBenefice);
        setResteTotal(totalReste);
    }


    const handleDelete = (id) => {
        axios
            .delete(`/api/recettes/${id}`)
            .then(response =>{
                if (response.status === 204){
                    alert('Recette supprimée avec succès');
                    setRecettes(recettes.filter(recette => recette.id !== id));
                    navigate('/recettes');
                } else{
                    alert('Erreur lors de la suppression de la recette');
                }
            })
            .catch(error => console.log(error));
    };

    // Tri des recettes par décroissante
    const sortedRecettes = [...recettes].sort((a,b) => moment(b.date).diff(moment(a.date)));

    // Filtre des recette en fonction de la période selectionnée
    const filteredRecettes = sortedRecettes.filter(recette =>{
        if (startDate && endDate){
            return moment(recette.date).isBetween(startDate, endDate, null, '[]');
        }else if (startDate){
            return moment(recette.date).isSameOrAfter(startDate, 'day');
        }else if (endDate){
            return moment(recette.date).isSameOrBefore(endDate, 'day');
        }else{
            return true;
        }
    })

    const confirmDelete = (id) => {
        if (window.confirm("Cette action est irreversible, voulez-vous vriament supprimer cette recette?"));
        handleDelete(id);
    }

    const columns = [
        {
            name: 'Date',
            selector: 'date',
            format: row => moment(row.date).format('YYYY-MM-DD')
        },
        {
            name: 'Montants',
            selector: 'montantTotal'
        },
        {
            name: 'Benefices',
            selector: 'beneficeTotal',
        },
        {
            name: 'Restes',
            selector: 'resteTotal'
        },
        {
            name: 'Actions',
            cell: row => (<button onClick={() => confirmDelete(row.id)} className="btn btn-sm">
                            <FontAwesomeIcon icon={faTrash} className="corbeille" />
                        </button>)
        }
    ];

    const handleStartDateChange = (e) => {
        const selectedDate = e.target.value;
        setStartDate(selectedDate ? moment(selectedDate).startOf('day') : null);
    };

    const handleEndDateChange = (e) => {
        const selectedDate = e.target.value;
        setEndDate(selectedDate ? moment(selectedDate).endOf('day') : null);
    }

    const handleReset = () => {
        setStartDate(moment().startOf('month'));
        setEndDate(moment().endOf('month'));
    }

    return(
        <div>
            <div className="mt-5 text-center justify-content-center align-items-center">
                <div className="row row-cols-3 g-4">
                    <div className="col">
                        <div className="card">
                            <div className="card-header text-bg-primary">Total</div>
                            <div className="card-body">
                                <h2 className="card-title">{montantTotal.toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header text-bg-primary">Bénéfice</div>
                            <div className="card-body">
                                <h2 className="card-title">{beneficeTotal.toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-header text-bg-primary">Reste Total</div>
                            <div className="card-body">
                                <h2 className="card-title">{resteTotal.toLocaleString()}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<h2 className="titre-page">Liste des recettes</h2>*/}
            <div className="row mt-3">
                <div className="col-5">
                    <label htmlFor="">Date de début:</label>
                    <input
                        type="date"
                        id="start-date"
                        className="form-control"
                        onChange={handleStartDateChange}
                        value={startDate ? moment(startDate).format('YYYY-MM-DD') : ''}
                    />
                </div>
                <div className="col-5">
                    <label htmlFor="">Date fin:</label>
                    <input
                        type="date"
                        id="end-date"
                        className="form-control"
                        onChange={handleEndDateChange}
                        value={endDate ? moment(endDate).format('YYYY-MM-DD') : ''}
                    />
                </div>
                <div className="col-2">
                    <button onClick={handleReset} className="btn btn-warning mt-4">
                        <FontAwesomeIcon icon={faUndo}/>
                    </button>
                </div>
            </div>
            <DataTable
                // title="Liste des recettes"
                columns={columns}
                data={filteredRecettes}
                pagination
                highlightOnHover
            />
        </div>
    );
}

export default RecetteList;