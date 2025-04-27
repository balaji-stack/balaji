
import React from 'react'


type Props = {}

const CodProdottoTable = (props: Props) => {
    return (
        <section>
            <div className="table_section">
                <div className="inner-content">
                    <div className="inner-table-content">
                        <div className="table-responsive">
                            <table className="table-main table table-striped table-borderless">
                                <thead className="sticky-thead">
                                    <tr>
                                        <th>Codice</th>
                                        <th>Codice Cliente</th>
                                        <th>Cross Reference Codice</th>
                                    
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                       
                                        <td>Codice</td>
                                        <td>Codice Cliente</td>
                                        <td>Cross Reference Codice</td>
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

export default CodProdottoTable