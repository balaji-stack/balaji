import React from 'react'

type Props = {
   
    strQuantitaInOmaggio: string;
    strConsegnaDataInizio: string;
    strPromozioniCode: string;
    strSelloutDataFine: string;
    strOrdiniDataInizio: string;
    strOrdiniDataFine : string
    strConsegnaDataFine: string;
    strPromozionidesc: string;
    strQuantitaAcquistata: string;
    strSconto1: string;
    strSconto2: string;
    strSconto3: string;
    strSconto4: string;
    strSelloutDataInizio: string;
}

const PromoListaTable = (props: Props) => {
    

    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">

                                    <tr>
                                        <th>% Sconto 1</th>
                                        <th>% Sconto 2</th>
                                        <th>% Sconto 3</th>
                                        <th>% Sconto 4</th>

                                    </tr>

                                    <tr>
                                        <td>{props.strSconto1}</td>
                                        <td>{props.strSconto2}</td>
                                        <td>{props.strSconto3}</td>
                                        <td>{props.strSconto4}</td>
                                    </tr>

                                    <tr>
                                        <th colSpan={2} >Sell-in Ordini</th>
                                        <th>Data inizio</th>
                                        <th>Data fine</th>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>{props.strOrdiniDataInizio}</td>
                                        <td>{props.strOrdiniDataFine}</td>
                                        
                                    </tr>


                                    <tr>
                                        <th colSpan={2} >Sell-in Consegna</th>
                                        <th>Data inizio</th>
                                        <th>Data fine</th>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>{props.strConsegnaDataInizio}</td>
                                        <td>{props.strConsegnaDataFine}</td>
                                        
                                    </tr>

                                    <tr>
                                        <th colSpan={2} >Sell Out</th>
                                        <th>Data inizio</th>
                                        <th>Data fine</th>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>{props.strSelloutDataInizio}</td>
                                        <td>{props.strSelloutDataFine}</td>
                                        
                                    </tr>

                                    <tr>
                                        <th colSpan={2} >Sconti Merce</th>
                                        <th>Quantita acquistata</th>
                                        <th>Quantita in omaggio</th>
                                    </tr>
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td>{props.strQuantitaAcquistata}</td>
                                        <td>{props.strQuantitaInOmaggio}</td>
                                        
                                    </tr>

                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default PromoListaTable