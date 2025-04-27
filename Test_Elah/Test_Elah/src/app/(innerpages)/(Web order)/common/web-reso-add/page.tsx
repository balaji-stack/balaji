"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FieldEl from '@/app/components/shared/FieldEl'
import FilterComponent from './FilterComponent'
import { dateBeforeThreeMonth } from '@/helpers/common'
import { Id_ordine, date_reso, clienteTabFields, spedizioneFields, informazioni, dati_spedizione,annotazione }
 from './helper'



type Props = {
    onChangeHandler: any;
}

export type filterType = {
    tcodice: string,
    ttitle: string,
    resi_datefrom: null | Date,
    resi_dateto: null | Date,

}

export const initialValue: filterType = {

    tcodice: '',
    ttitle: '',
    resi_datefrom: new Date(dateBeforeThreeMonth),
    resi_dateto: new Date(),



};


const page = (props: Props) => {


    const [filter, setFilter] = useState<filterType>(initialValue);

    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }


    const resetHandler = () => {
        setFilter(initialValue);
    }

    const searchHandler = () => {

    }




    return (
        <main>
            <div className="page_title">
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Title heading="WEB RESI"></Title>

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


            <div className="tab_block">
                <Tabs defaultActiveKey="reso testata" id="uncontrolled-tab-example" className="button_tab_block" >
                    <Tab eventKey="reso testata" title="RESO TESTATA">
                        <Card bgColor="#f9f9f9">
                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Date reso"></Title>
                                    </div>
                                    <div className="row">
                                        {date_reso?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>
                            <div className="tab_block">
                                <Tabs defaultActiveKey="cliente" id="uncontrolled-tab-example" className="button_tab_block" >
                                    <Tab eventKey="cliente" title="CLIENTE">

                                        <Card>
                                            <div className="row">
                                                {clienteTabFields?.map((it) => {
                                                    return (
                                                        <FieldEl key={it.id} fieldType={it.fieldType}
                                                            label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
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
                                                            label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
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
                                                            label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
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
                                        <Title heading="Informazioni"></Title>
                                    </div>
                                    <div className="row">
                                        {informazioni?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>

                                </div>
                            </Card>

                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Dati spedizione"></Title>
                                    </div>
                                    <div className="row">
                                        {dati_spedizione?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined}                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>


                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Annotazione"></Title>
                                    </div>
                                    <div className="row">
                                        {annotazione?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined}                                                />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>

                        </Card>

                    </Tab>

                    <Tab eventKey="reso righe" title="RESO RIGHE">
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
                                                    colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>


                            <Card>
                                <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                                    resetHandler={resetHandler} searchHandler={searchHandler}
                                />
                            </Card>

                            <Card>
                                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                    <Title heading="Lista"></Title>
                                </div>
                                <section>
                                    <div className="table_section">
                                        <div className="inner-content">
                                            <div className="inner-table-content">
                                                <div className="table-responsive">
                                                    <table className="table-main table table-striped table-borderless">
                                                        <thead className="sticky-thead">
                                                            <tr>
                                                                <th>-</th>
                                                                <th>-</th>
                                                                <th>Codice</th>
                                                                <th>Descrizione</th>
                                                                <th>Fatt.Nr.</th>
                                                                <th>Nota Credito</th>
                                                                <th>Ri Fatt.Nr.</th>
                                                                <th>Fatt.Riga</th>
                                                                <th>DDT Nr.</th>
                                                                <th>DDT Riga</th>
                                                                <th>DDT Data</th>
                                                                <th> Ord.Nr</th>
                                                                <th>Ord.Riga</th>
                                                                <th> Causale Riga</th>
                                                                <th> Pz.Cartone</th>
                                                                <th>DDT UM </th>
                                                                <th>Cartone/Expo Spediti</th>
                                                                <th>Quantita Vendita</th>
                                                                <th>Resi Prec.</th>
                                                                <th>Pz.Vend</th>
                                                                <th>Imp.Netto</th>
                                                                <th> Val.Pezzo</th>
                                                                <th>UM Reso</th>
                                                                <th>Qt.a Reso</th>


                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td>Codice</td>
                                                                <td>Descrizione</td>
                                                                <td>Fatt.Nr.</td>
                                                                <td>Nota Credito</td>
                                                                <td>Ri Fatt.Nr.</td>
                                                                <td>Fatt.Riga</td>
                                                                <td>DDT Nr.</td>
                                                                <td>DDT Riga</td>
                                                                <td>DDT Data </td>
                                                                <td> Ord.Nr</td>
                                                                <td>Ord.Riga</td>
                                                                <td>Causale Riga</td>
                                                                <td> Pz.Cartone</td>
                                                                <td>DDT UM </td>
                                                                <td>Cartone/Expo Spediti</td>
                                                                <td>Quantita Vendita</td>
                                                                <td>Resi Prec.</td>
                                                                <td>Pz.Vend </td>
                                                                <td>Imp.Netto</td>
                                                                <td>Val.Pezzo</td>
                                                                <td>UM Reso</td>
                                                                <td>Qt.a Reso</td>


                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>

                            </Card>

                        </Card>
                    </Tab>
                </Tabs>


            </div>

            <Card>
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">

                        <div className="mb-4">
                            <input id="resoConfermato" className="form-check-input" type="checkbox" />
                            <label htmlFor="resoConfermato" className="form-check-label">Reso confermato</label>
                        </div>
                    </div>

                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6" style={{ display: 'flex', justifyContent: 'end' }}>
                        <button type="button" className="site_btn brdr_btn">
                            Submit
                        </button>
                    </div>
                </div>

            </Card>






        </main>
    )
}

export default page