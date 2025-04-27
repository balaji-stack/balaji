
import React from 'react'
import { filterType } from '../page';

import Link from 'next/link';

type Props = {}


const GruppoVisualizzaTable = (props: Props) => {

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
                                        <th>PDV</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Codice</td>
                                        <td>Descrizione</td>
                                        <td ><Link href={'/components/shared/assegnatariPromozione'}>PDV</Link></td>
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

export default GruppoVisualizzaTable