import React from 'react'

type Props = {}

const UbicazioneTable = (props: Props) => {
  return (
    <section>
    <div className="table_section">
        <div className="inner-content">
            <div className="inner-table-content">
                <div className="table-responsive">
                    <table className="table-main table table-striped table-borderless">
                        <thead className="sticky-thead">
                            <tr>
                                <th></th>
                                <th>Codice</th>
                                <th>Ragione sociale</th>
                                <th>Ragione sociale2</th>
                               

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Codice</td>
                                <td>Ragione sociale</td>
                                <td>Ragione sociale2</td>
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

export default UbicazioneTable