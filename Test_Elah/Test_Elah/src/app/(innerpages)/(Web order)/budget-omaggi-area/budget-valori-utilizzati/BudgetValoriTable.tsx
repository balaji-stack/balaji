import React from 'react'

type Props = {}

const BudgetValoriTable = (props: Props) => {
  return (
    <section>
    <div className="table_section">
        <div className="inner-content">
            <div className="inner-table-content">
                <div className="table-responsive">
                    <table className="table-main table table-striped table-borderless">

                        <tbody>
                            <tr>
                                <th>Anno</th>
                                <td style={{ color: 'red' }}>Anno</td>
                            </tr>
                            <tr>
                                <th>Area</th>
                                <td style={{ color: 'red' }}>Area</td>
                            </tr>
                            <tr>
                                <th>Quadrimestre Budget</th>
                                <td style={{ color: 'red' }}>Quadrimestre Budget</td>
                            </tr>
                            <tr>
                                <th>Totale gia utilizzato</th>
                                <td style={{ color: 'red' }}>Totale gia utilizzato</td>
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

export default BudgetValoriTable