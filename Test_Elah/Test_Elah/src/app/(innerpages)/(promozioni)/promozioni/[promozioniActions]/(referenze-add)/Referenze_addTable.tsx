import React from 'react'

type Props = {}

const Referenze_addTable = (props: Props) => {
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
                                <th>Descrizione</th>
                                <th>Marchio</th>
                                <th>Linea</th>
                                <th>Macro-famiglia</th>
                                <th>Volantino</th>
                                <th>Mod.consegna</th>
                                <th>Cod.prodotto del cliente</th>
                                



                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Codice</td>
                                <td>Descrizione</td>
                                <td>Marchio</td>
                                <td>Linea</td>
                                <td>Macro-famiglia</td>
                                <td>Volantino</td>
                                <td>Mod.consegna</td>
                                <td>Cod.prodotto del cliente</td>
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

export default Referenze_addTable