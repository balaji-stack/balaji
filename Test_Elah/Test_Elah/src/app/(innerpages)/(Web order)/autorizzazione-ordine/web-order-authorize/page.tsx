"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FieldEl from '@/app/components/shared/FieldEl'
import { date_ordine, clienteTabFields, spedizioneFields, dati_ordine, totali_ordine, annotazione, invio }
    from './helper';
import { useRouter } from 'next/navigation'



type Props = {
    onchangeHandler: any;
}

const page = (props: Props) => {
    const onchangeHandler = props.onchangeHandler;
    const router = useRouter();

    return (
        <main>
            <div className="page_title">
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Title heading="WEB ORDINI"></Title>

                    </div>
                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6">
                        <div className="btn_grp_header">
                            <div className="link_grp">
                                <ul className="subnav_ul" >
                                    <li>
                                        <Link href="#">Ritorna</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Primo</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Precedente</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Successivo</Link>
                                    </li>
                                    <li>
                                        <Link href="#">Ultimo</Link>
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
                                        <Title heading="Date ordine "></Title>
                                    </div>
                                    <div className="row">
                                        {date_ordine?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>

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

                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Dati ordine "></Title>
                                    </div>
                                    <div className="row">
                                        {dati_ordine?.map((it) => {
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
                                        <Title heading="Totali ordine "></Title>
                                    </div>
                                    <div className="row">
                                        {totali_ordine?.map((it) => {
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
                                        <Title heading="Annotazione "></Title>
                                    </div>
                                    <div className="row">
                                        {annotazione?.map((it) => {
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
                                        <Title heading="Invio "></Title>
                                    </div>
                                    <div className="row">
                                        {invio?.map((it) => {
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
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">

                                        <Title heading="Ordine creato creato da"></Title>

                                        <section>
                                            <div className="table_section">
                                                <div className="inner-content">
                                                    <div className="inner-table-content">
                                                        <div className="table-responsive">
                                                            <table className="table-main table table-striped table-borderless">
                                                                <tr>
                                                                    <th>UTENTE</th>
                                                                    <th>DATA</th>
                                                                </tr>
                                                                <tr>
                                                                    <td>Administrator</td>
                                                                    <td>05-04-2022 06:48:21 AM</td>
                                                                </tr>

                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </section>


                                    </div>

                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">

                                        <Title heading="Ordine modificato da"></Title>
                                        <section>
                                            <div className="table_section">
                                                <div className="inner-content">
                                                    <div className="inner-table-content">
                                                        <div className="table-responsive">
                                                            <table className="table-main table table-striped table-borderless">
                                                                <tr>
                                                                    <th>UTENTE</th>
                                                                    <th>TASK</th>
                                                                    <th>DATA</th>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>

                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </section>

                                    </div>

                                </div>
                            </Card>

                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Autorizzazione"></Title>
                                        pending work is there

                                    </div>
                                </div>


                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <button type="button" className="site_btn brdr_btn" style={{ padding: '0px 25px' }}
                                            onClick={() => router.push('web-order-budget')}
                                        >
                                            BUDGET OMAGGI
                                        </button>
                                    </div>

                                    <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6" style={{ display: 'flex', justifyContent: 'end' }}>
                                        <button type="button" className="site_btn brdr_btn">
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </Card>
                        </Tab>

                        <Tab eventKey="ordine righe" title="ORDINE RIGHE">
                            tab2
                        </Tab>

                    </Tabs>

                </div>
            </Card>




        </main>
    )
}

export default page