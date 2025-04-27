import React from 'react'

type Props = {}

const PuntivenditaTable = (props: Props) => {
  return (
    <section>
    <div className="table_section">
        <div className="inner-content">
            <div className="inner-table-content">
                <div className="table-responsive">
                    <table className="table-main table table-striped table-borderless">
                        <thead className="sticky-thead">
                            <tr>
                                <th>-</th>
                                <th>Codice</th>
                                <th>Ragione sociale</th>
                                <th>Cod Ricerca</th>
                                <th>Citta</th>
                                <th>Indirizzo</th>
                                <th>Super Gruppo</th>
                                <th>Gruppo</th>
                                <th>Sotto Gruppo</th>
                                <th>Agente</th>
                                <th>Area</th>



                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Codice</td>
                                <td>Ragione sociale</td>
                                <td>Cod Ricerca</td>
                                <td>Citta</td>
                                <td>Indirizzo</td>
                                <td>Super Gruppo</td>
                                <td>Gruppo</td>
                                <td>Sotto Gruppo</td>
                                <td>Agente</td>
                                <td>Area</td>
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

export default PuntivenditaTable