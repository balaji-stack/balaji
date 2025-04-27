import React from 'react'

type Props = {}

const ListaTable = (props: Props) => {
  return (
    <section>
    <div className="table_section">
        <div className="inner-content">
            <div className="inner-table-content">
                <div className="table-responsive">
                    <table className="table-main table table-striped table-borderless">
                        <thead className="sticky-thead">
                            <tr>
                                <th>Numero ordine</th>
                                <th>Data ordine</th>
                                <th>Rif.Ord.cl.</th>
                                <th>Codice cliente</th>
                                <th>Ragione sociale</th>
                                <th>Indirizzo spedizione merce</th>
                                <th>Citta spedizione merce</th>
                                <th>Codice articolo</th>
                                <th>Descrizione articolo</th>
                                <th>Q.ta omaggio</th>
                                <th>Causale omaggio</th>
                                <th>Prezzo singolo</th>
                                <th>Prezzo totale</th>
                                <th>Nota giustificazione</th>
                                <th>Cod agente</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Numero ordine</td>
                                <td>Data ordine</td>
                                <td>Rif.Ord.cl.</td>
                                <td>Codice cliente</td>
                                <td>Ragione sociale</td>
                                <td>Indirizzo spedizione merce</td>
                                <td>Citta spedizione merce</td>
                                <td>Codice articolo</td>
                                <td>Descrizione articolo</td>
                                <td>Q.ta omaggio</td>
                                <td>Causale omaggio</td>
                                <td>Prezzo singolo</td>
                                <td>Prezzo totale</td>
                                <td>Nota giustificazione</td>
                                <td>Cod agente</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</section>
  )
}
export default ListaTable