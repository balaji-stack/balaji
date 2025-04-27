import React from 'react'

type Props = {}

const SottoGruppiTable = (props: Props) => {
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
                                <th>Gruppo</th>
                                <th>PDV</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Codice</td>
                                <td>Descrizione</td>
                                <td>Gruppo</td>
                                <td>PDV</td>
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

export default SottoGruppiTable