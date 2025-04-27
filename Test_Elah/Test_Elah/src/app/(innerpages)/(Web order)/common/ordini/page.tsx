"use client"

import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Card from '@/app/components/shared/Card'
import FieldEl from '@/app/components/shared/FieldEl'
import { Id_ordine, riferimento, giro, clienteTabFields, spedizioneFields, pagamento, dati_bancari, spedizione, vettori, stato_ordine, totale_ordine, note_ordine }
    from './helper';
import FilterComponent from './FilterComponent'



export type filterType = {
    ticodice: string,
    tidescription: string,
}

export const initialValue: filterType = {
    ticodice: "",
    tidescription: ""

}

type Props = {
    onchangeHandler: any;
}

const page = (props: Props) => {

    const [filter, setFilter] = useState<filterType>(initialValue);

    const onchangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }

    const searchHandler = () => {

    }

    return (
        <main>
            <div className="page_title">
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Title heading="ORDINI"></Title>

                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6">
                        <div className="btn_grp_header">
                            <div className="link_grp">
                                <ul className="subnav_ul" >
                                    <li>
                                        <Link href="#">Ritorna</Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Card bgColor="#f9f9f9">
                <div className="tab_block">
                    <Tabs defaultActiveKey="ordine testata" id="uncontrolled-tab-example" className="button_tab_block" >
                        <Tab eventKey="ordine testata" title="ORDINE TESTATA">
                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="ID ordine "></Title>
                                    </div>
                                    <div className="row">
                                        {Id_ordine?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>

                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <Card>
                                        <Title heading="Riferimento ordine cliente"></Title>
                                        <div className="row">
                                            {riferimento?.map((it) => {
                                                return (
                                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                                        label={it.label} value={it.value}
                                                        colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                                )
                                            })}
                                        </div>
                                    </Card>
                                </div>

                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <Card>
                                        <Title heading="Giro"></Title>

                                        <div className="row">
                                            {giro?.map((it) => {
                                                return (
                                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                                        label={it.label} value={it.value}
                                                        colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                                )
                                            })}
                                        </div>
                                    </Card>
                                </div>

                            </div>

                            <div className="tab_block">
                                <Tabs defaultActiveKey="cliente" id="uncontrolled-tab-example" className="button_tab_block" >
                                    <Tab eventKey="cliente" title="CLIENTE">
                                        <Card>
                                            <div className="row">
                                                {clienteTabFields?.map((it) => {
                                                    return (
                                                        <FieldEl key={it.id} fieldType={it.fieldType}
                                                            label={it.label} value={it.value}
                                                            colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                                    )
                                                })}
                                            </div>
                                        </Card>
                                    </Tab>

                                    <Tab eventKey="fatturazione" title="FATTURAZIONE">
                                        <Card>
                                            <div className="row">
                                                {clienteTabFields?.map((it) => {
                                                    return (
                                                        <FieldEl key={it.id} fieldType={it.fieldType}
                                                            label={it.label} value={it.value}
                                                            colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                                    )
                                                })}
                                            </div>
                                        </Card>
                                    </Tab>

                                    <Tab eventKey="spedizione" title="SPEDIZIONE">
                                        <Card>
                                            <div className="row">
                                                {spedizioneFields?.map((it) => {
                                                    return (
                                                        <FieldEl key={it.id} fieldType={it.fieldType}
                                                            label={it.label} value={it.value}
                                                            colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                                    )
                                                })}
                                            </div>
                                        </Card>
                                    </Tab>

                                </Tabs>
                            </div>

                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Pagamento"></Title>
                                    </div>
                                    <div className="row">
                                        {pagamento?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>


                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Dati bancari"></Title>
                                    </div>
                                    <div className="row">
                                        {dati_bancari?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>


                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Spedizione"></Title>
                                    </div>
                                    <div className="row">
                                        {spedizione?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Vettori"></Title>
                                    </div>
                                    <div className="row">
                                        {vettori?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>


                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <Card>
                                        <Title heading="Stato ordine"></Title>
                                        <div className="row">
                                            {stato_ordine?.map((it) => {
                                                return (
                                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                                        label={it.label} value={it.value}
                                                        colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                                )
                                            })}
                                        </div>
                                    </Card>
                                </div>

                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <Card>
                                        <Title heading="Totale ordine"></Title>

                                        <div className="row">
                                            {totale_ordine?.map((it) => {
                                                return (
                                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                                        label={it.label} value={it.value}
                                                        colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                                )
                                            })}
                                        </div>
                                    </Card>
                                </div>

                            </div>

                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Note ordine"></Title>
                                    </div>
                                    <div className="row">
                                        {note_ordine?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>
                        </Tab>


                        <Tab eventKey="ordine righe" title="ORDINE RIGHE (RECORDS)">
                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="ID ordine "></Title>
                                    </div>
                                    <div className="row">
                                        {Id_ordine?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>

                         
                            <FilterComponent filter={filter} onChangeHandler={onchangeHandler}   searchHandler={searchHandler} />

                            <Card>
                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                    <Title heading="Righe ordine"></Title>
                                </div>
                                <section>
                                    <div className="table_section">
                                        <div className="inner-content">
                                            <div className="inner-table-content">
                                                <div className="table-responsive">
                                                    <table className="table-main table table-striped table-borderless">
                                                        <thead className="sticky-thead">
                                                            <tr>
                                                                <th>Codice articolo</th>
                                                                <th>Descrizione</th>
                                                                <th>UM</th>
                                                                <th>Q.</th>
                                                                <th>Q.SP.</th>
                                                                <th>Q.Orig.</th>
                                                                <th>PREZZO</th>
                                                                <th>IVA</th>
                                                                <th>SC.</th>
                                                                <th>FORM. SC.</th>
                                                                <th>IMPON.</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Codice articolo</td>
                                                                <td>Descrizione</td>
                                                                <td>UM</td>
                                                                <td>Q.</td>
                                                                <td>Q.SP.</td>
                                                                <td>Q.Orig.</td>
                                                                <td>PREZZO</td>
                                                                <td>IVA</td>
                                                                <td>SC.</td>
                                                                <td>FORM. SC.</td>
                                                                <td>IMPON.</td>
                                                                
                                                              


                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>

                            </Card>




                        </Tab>
                    </Tabs>


                </div>

            </Card>

        </main>
    )
}

export default page