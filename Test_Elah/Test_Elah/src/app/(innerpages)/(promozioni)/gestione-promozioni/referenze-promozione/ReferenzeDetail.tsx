import React, { useEffect } from 'react'

type Props = {
    promozionCode: string;
    promozionDesc: string;
    CampaignCode: string;
    CampaignDesc: string;
}

const ReferenzeTable = (props: Props) => {
    useEffect(()=>{
        console.log("ReferenzeTable fn")
        console.log(props.promozionCode);
    },[])
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
                                <td style={{ color: 'red' }}>{props.promozionCode}</td>
                            </tr>
                            <tr>
                                <th>Descrizione promozione</th>
                                <td style={{ color: 'red' }}>{props.promozionDesc} </td>
                            </tr>
                            <tr>
                                <th>Codice campagna</th>
                                <td style={{ color: 'red' }}>{props.CampaignCode}</td>
                            </tr>
                            <tr>
                                <th>Descrizione campagna</th>
                                <td style={{ color: 'red' }}>{props.CampaignDesc}</td>
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

export default ReferenzeTable


