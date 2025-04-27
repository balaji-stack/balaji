"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FilterComponent from './FilterComponent'
import { date_ordine, clienteTabFields, spedizioneFields, dati_ordine, totali_ordine, dati_spedizione, annotazione, invio, Id_ordine, totale }
    from './helper'
import { useRouter } from 'next/navigation'
import { useSelector } from "react-redux";
import SERVER_URL from '@/helpers/common'
import axios from 'axios'
import FieldEl from '@/app/components/shared/FieldEl'

type Props = {}

type selectField = { label: string, value: string };

export type filterType = {

    causalearea: selectField,
    soscodice: string,
    sostitle: string,
    sositemtype: selectField,
    sosmarchio: selectField,
    soslinea: selectField,
    sosmacrofamiglia: string

}
export const initialValue: filterType = {
    causalearea: { label: '', value: '' },
    soscodice: '',
    sostitle: '',
    sositemtype: { label: '', value: '' },
    sosmarchio: { label: '', value: '' },
    soslinea: { label: '', value: '' },
    sosmacrofamiglia: '',

}
const Page = (props: Props) => {

    const router = useRouter();

    const [filter, setFilter] = useState<filterType>(initialValue);

    const order = useSelector((state: any) => state.action.urlParamObject);
    useEffect(() => {
        const URL = `${SERVER_URL}/orderEntry/getWebOrderAdd`;
        axios.post(URL, order, {
            withCredentials: true,
        }).then((res) => {
            console.log(res.data);
        })
    }, [])

    const onChangeHandler = (key: string, value: string) => {
    }


    const resetHandler = () => {

    }



    const searchHandler = () => {


    }
    return (
        <main>
            <div className="page_title">
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Title heading="Web Ordini"></Title>

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
                            <form>
                                <Card>
                                    <div className="row">
                                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                            <Title heading="Date ordine "></Title>
                                        </div>
                                        <div className="row">
                                            {date_ordine?.map((it) => {
                                                return (
                                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                                        label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
                                                )
                                            })}
                                        </div>
                                    </div>
                                </Card>
                            </form>
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
                                        <Title heading="Dati ordine"></Title>
                                    </div>

                                    <div className="row">
                                        {dati_ordine?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
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
                                                    label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
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
                                                    label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
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
                                                    label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>


                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Invio"></Title>
                                    </div>
                                    <div className="row">
                                        {invio?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value} colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
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




                        </Tab>

                        <Tab eventKey="ordine righe" title="ORDINE RIGHE">
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

                            </Card>

                            <Card>
                                <section>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Lista"></Title>
                                    </div>
                                    <div className="table_section">
                                        <div className="inner-content">
                                            <div className="inner-table-content">
                                                <div className="table-responsive">
                                                    <table className="table-main table table-striped table-borderless">
                                                        <thead className="sticky-thead">
                                                            <tr>
                                                                <th></th>
                                                                <th></th>
                                                                <th></th>
                                                                <th>Codice</th>
                                                                <th>Descrizione</th>
                                                                <th>UM</th>
                                                                <th>Q.ta</th>
                                                                <th>Prezzo</th>
                                                                <th>% sc</th>
                                                                <th>Promo</th>
                                                                <th>% sc Promo</th>
                                                                <th>Sconto merce</th>
                                                                <th>Prezzo scontato</th>
                                                                <th>Prezzo totale</th>
                                                                <th>Sconto PFA</th>
                                                                <th>% Sconto PFA</th>
                                                                <th>Sconto Continuativo</th>
                                                                <th>Sconto Continuativo 2</th>
                                                                <th>% Sconto Continuativo 2</th>
                                                                <th>Sconto Continuativo 3</th>
                                                                <th>% Sconto Continuativo 3</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td></td>
                                                                <td onClick={() => router.push('common/dettaglio-articolo')}><Link href={''}>click</Link></td>
                                                                <td>Codice</td>
                                                                <td>Descrizione</td>
                                                                <td>UM</td>
                                                                <td>Q.ta</td>
                                                                <td>Prezzo</td>
                                                                <td>% sc</td>
                                                                <td>Promo</td>
                                                                <td>% sc Promo</td>
                                                                <td>Sconto merce</td>
                                                                <td>Prezzo scontato</td>
                                                                <td>Prezzo totale</td>
                                                                <td>Sconto PFA</td>
                                                                <td>% Sconto PFA</td>
                                                                <td>Sconto Continuativo</td>
                                                                <td>Sconto Continuativo 2</td>
                                                                <td>% Sconto Continuativo 2</td>
                                                                <td>Sconto Continuativo 3</td>
                                                                <td>% Sconto Continuativo 3</td>

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

                        <Tab eventKey="omaggi" title="OMAGGI">

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

                            <div className="tab_block">
                                <Tabs defaultActiveKey="area" id="uncontrolled-tab-example" className="button_tab_block" >
                                    <Tab eventKey="area" title="AREA">

                                        <Card>
                                            <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                                                resetHandler={resetHandler} searchHandler={searchHandler} />
                                        </Card>


                                    </Tab>
                                    <Tab eventKey="clienti" title="CLIENTI">
                                        <Card>
                                            <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                                                resetHandler={resetHandler} searchHandler={searchHandler} />
                                        </Card>
                                    </Tab>
                                </Tabs>
                            </div>


                            <Card>
                                <section>
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Lista"></Title>
                                    </div>
                                    <div className="table_section">
                                        <div className="inner-content">
                                            <div className="inner-table-content">
                                                <div className="table-responsive">
                                                    <table className="table-main table table-striped table-borderless">
                                                        <thead className="sticky-thead">
                                                            <tr>
                                                                <th></th>
                                                                <th></th>
                                                                <th>Codice</th>
                                                                <th>Descrizione</th>
                                                                <th>UM</th>
                                                                <th>Q.ta</th>
                                                                <th>Causale</th>
                                                                <th>Prezzo</th>
                                                                <th>Prezzo totale</th>
                                                                <th>Nota giustificazione</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td></td>
                                                                <td onClick={() => router.push('common/dettaglio-articolo')}><Link href={''}>click</Link></td>
                                                                <td>Codice</td>
                                                                <td>Descrizione</td>
                                                                <td>UM</td>
                                                                <td>Q.ta</td>
                                                                <td>Causale</td>
                                                                <td>Prezzo</td>
                                                                <td>Prezzo totale</td>
                                                                <td>Nota giustificazione</td>

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
                                                colArr={it.colArr} field={''} onchangeHandler={onChangeHandler} options={undefined} />
                                        )
                                    })}
                                </div>

                            </Card>


                        </Tab>

                    </Tabs>

                    <Card>
                        <div className="row">
                            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">

                                <div className="mb-4">
                                    <input id="ordineConfermato" className="form-check-input" type="checkbox" />
                                    <label htmlFor="ordineConfermato" className="form-check-label">Ordine confermato</label>
                                </div>


                            </div>

                            <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6" style={{ display: 'flex', justifyContent: 'end' }}>
                                <button type="button" className="site_btn brdr_btn">
                                    Submit
                                </button>
                            </div>
                        </div>

                    </Card>

                </div>
            </Card>

        </main>
    )
}


export default Page






