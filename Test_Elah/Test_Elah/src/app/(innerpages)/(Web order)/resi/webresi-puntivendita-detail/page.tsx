"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React from 'react'
import FieldColumn from '../../order-entry/web-order-add/FieldColumn'
import { Tab, Tabs } from 'react-bootstrap'
import { customer, giro, clienteTabFields, spedizioneFields ,pagamento,dati_spedizione
  } from './helper'
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
                        <Title heading="WEB RESI ORDINI"></Title>

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
                <Card>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <Title heading="Customer"></Title>
                        </div>
                        <div className="row">
                            {customer?.map((it) => {
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
                            <Title heading="Giro"></Title>
                        </div>
                        <div className="row">
                            {giro?.map((it) => {
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
                            <Title heading="Dati Spedizione"></Title>
                        </div>
                        <div className="row">
                            {dati_spedizione?.map((it) => {
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
                <div className="btn_grp">
        <div className="btn_grp_inner">
            <button
                type="button"
                className="site_btn primary_btn"
                onClick={() => router.push('/common/web-reso-edit')}
            >
                 Nuovo reso
            </button>
            
        </div>
    </div>
                </Card>
            </Card>

        </main>
    )
}

export default page