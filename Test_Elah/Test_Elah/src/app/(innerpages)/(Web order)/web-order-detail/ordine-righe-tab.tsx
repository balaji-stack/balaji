import Card from '@/app/components/shared/Card'
import FieldEl from '@/app/components/shared/FieldEl'
import Title from '@/app/components/shared/Title'
import React, { useState } from 'react'
import FilterComponent from './FilterComponent'
import { Tab } from 'react-bootstrap'

export type filterType = {
    ticodice: string,
    tidescription: string,
}
export const initialValue: filterType = {
    ticodice: "",
    tidescription: ""
}
type Props = {}
const OrdineRigheTab = (props: Props) => {
    const onchangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
      }


    const searchHandler = () => {

    }
    const [filter, setFilter] = useState<filterType>(initialValue);
    const Id_ordine = [{ id: 1, 'fieldType': 'viewText', 'label': 'Codice cliente', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
    { id: 2, 'fieldType': 'viewText', 'label': 'Nome cliente', 'value': 'A Z S.P.A', 'colArr': [4, 4, 4, 12, 12, 12] },
    { id: 3, 'fieldType': 'viewText', 'label': 'Agente', 'value': '(HZ) Lagana Filippo (Area 09)', 'colArr': [4, 4, 4, 12, 12, 12] }];

    const totale = [{ id: 1, 'fieldType': 'viewText', 'label': 'Totale prezzo di vendita', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
    { id: 2, 'fieldType': 'viewText', 'label': 'Totale sconto', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
    { id: 3, 'fieldType': 'viewText', 'label': 'TOTALE', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];
    return (
            <Card bgColor="#f9f9f9">
                <Card>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <Title heading="ID ordine"></Title>
                        </div>
                        <div className="row">
                            {Id_ordine?.map((it) => {
                                return (
                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                        label={it.label} value={it.value}
                                        colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
                                )
                            })}
                        </div>
                    </div>
                </Card>




                <FilterComponent filter={filter} onChangeHandler={onchangeHandler} searchHandler={searchHandler} />



                <Card>

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
                                                    <th>Descrizione</th>
                                                    <th>UM</th>
                                                    <th>Q.ta</th>
                                                    <th>Q.t Esclusa</th>
                                                    <th>Tipo Esclusione</th>
                                                    <th>Causale omaggio</th>
                                                    <th>Prezzo</th>
                                                    <th>%sc</th>
                                                    <th>Nota giustificazione</th>
                                                    <th>Promo</th>
                                                    <th>%sc Promo</th>
                                                    <th>Prezzo Scontato</th>
                                                    <th>Prezzo Totale</th>
                                                    <th>Prezzo Totale Ricalcolato</th>
                                                    <th>Sconto PFA</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td>Codice</td>
                                                    <td>Descrizione</td>
                                                    <td>UM</td>
                                                    <td>Q.ta</td>
                                                    <td>Q.t Esclusa</td>
                                                    <td>Tipo Esclusione</td>
                                                    <td>Causale omaggio</td>
                                                    <td>Prezzo</td>
                                                    <td>%sc</td>
                                                    <td>Nota giustificazione</td>
                                                    <td>Promo</td>
                                                    <td>%sc Promo</td>
                                                    <td>Prezzo Scontato</td>
                                                    <td>Prezzo Totale</td>
                                                    <td>Prezzo Totale Ricalcolato</td>
                                                    <td>Sconto PFA</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>

                </Card>

                <Card>
                    <div className="row">
                        {totale?.map((it) => {
                            return (
                                <FieldEl key={it.id} fieldType={it.fieldType}
                                    label={it.label} value={it.value}
                                    colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
                            )
                        })}
                    </div>
                </Card>
            </Card>
    )
}

export default OrdineRigheTab;