import React from 'react'

type Props = {
    promozioniCode: string;
    promozioniDesc: string;
    campaignCode: string;
    campaignDesc: string;
}
const GruppoTable = (props: Props) => { 
  return (
    <section>
    <div className="table_section">
        <div className="inner-content">
            <div className="inner-table-content">
                <div className="table-responsive">
                    <table className="table-main table table-striped table-borderless">
                        <tbody>
                            <tr>
                                <th>Codice promozione</th>
                                <td style={{ color: 'red' }}>{props.promozioniCode}</td>
                            </tr>
                            <tr>
                                <th>Descrizione promozione</th>
                                <td style={{ color: 'red' }}>{props.promozioniDesc}</td>
                            </tr>
                            <tr>
                                <th>Codice campagna</th>
                                <td style={{ color: 'red' }}>{props.campaignCode}</td>
                            </tr>
                            <tr>
                                <th>Descrizione campagna</th>
                                <td style={{ color: 'red' }}>{props.campaignDesc}</td>
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
export default GruppoTable


