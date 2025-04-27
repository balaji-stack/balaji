
import React from 'react'
import { filterType } from './page';

type Props = {
    filter :filterType;
}

const AggiungipromozioniTable = (props: Props) => {
    const filter = props.filter;
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
                                        <th>Area</th>
                                        <th>Descrizione</th>
                                      
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Area</td>
                                        <td>Descrizione</td>
                                      
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

export default AggiungipromozioniTable