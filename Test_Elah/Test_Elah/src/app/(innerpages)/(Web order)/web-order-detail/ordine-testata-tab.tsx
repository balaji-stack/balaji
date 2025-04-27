import Card from '@/app/components/shared/Card'
import FieldEl from '@/app/components/shared/FieldEl'
import Title from '@/app/components/shared/Title'
import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'

type Props = {
    apiData: any;
}

const OrdineTestataTab = (props: Props) => {
    const apiData = props.apiData;
    const date_ordine = apiData?.date_ordine;
    const date_ordineFields = [{ id:1,'fieldType': 'viewText', 'label': 'Data ordine', 'value': `${date_ordine?.data_ordine}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:2,'fieldType': 'viewText', 'label': 'Data Consegna', 'value': `${date_ordine?.data_consegna}`, 'colArr': [4, 4, 4, 12, 12, 12] }];
const cliente = apiData?.cliente;
const clienteFields = [{ id:1,'fieldType': 'viewText', 'label': 'Ragione Sociale', 'value': `${cliente?.ragione_sociale}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:2,'fieldType': 'viewText', 'label': 'Indirizzo', 'value': `${cliente?.indirizzo}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:3,'fieldType': 'viewText', 'label': 'Citta', 'value': `${cliente?.città}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:4,'fieldType': 'viewText', 'label': 'CAP', 'value': `${cliente?.cap}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:5,'fieldType': 'viewText', 'label': 'PV', 'value': `${cliente?.data_consegna}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:6, 'fieldType': 'viewText', 'label': 'Partita IVA', 'value':`${cliente?.partita_iva}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:7,'fieldType': 'viewText', 'label': 'Riferimento', 'value': `${cliente?.riferimento}`, 'colArr': [4, 4, 4, 12, 12, 12] }];
const fatturazione = apiData?.fatturazione;
const fatturazioneFields = [{ id:1,'fieldType': 'viewText', 'label': 'Ragione Sociale', 'value': `${fatturazione?.ragione_sociale}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:2,'fieldType': 'viewText', 'label': 'Indirizzo', 'value': `${fatturazione?.indirizzo}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:3,'fieldType': 'viewText', 'label': 'Citta', 'value': `${fatturazione?.città}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:4,'fieldType': 'viewText', 'label': 'CAP', 'value': `${fatturazione?.cap}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:5,'fieldType': 'viewText', 'label': 'PV', 'value': `${fatturazione?.pv}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:6, 'fieldType': 'viewText', 'label': 'Partita IVA', 'value':`${fatturazione?.partita_iva}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:7,'fieldType': 'viewText', 'label': 'Riferimento', 'value': `${fatturazione?.riferimento}`, 'colArr': [4, 4, 4, 12, 12, 12] }];
const spedizione = apiData?.spedizione;
const spedizioneFields = [{ id:1, 'fieldType': 'viewText', 'label': 'Ragione Sociale', 'value': `${spedizione?.ragione_sociale}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:2,'fieldType': 'viewText', 'label': 'Indirizzo', 'value': `${spedizione?.indirizzo}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:3,'fieldType': 'viewText', 'label': 'Citta', 'value': `${spedizione?.città}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:4,'fieldType': 'viewText', 'label': 'CAP', 'value': `${spedizione?.cap}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:5,'fieldType': 'viewText', 'label': 'PV', 'value': `${spedizione?.pv}`, 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:6,'fieldType': 'viewText', 'label': 'Riferimento', 'value': `${spedizione?.riferimento}`, 'colArr': [4, 4, 4, 12, 12, 12] }];

const dati_ordine = [{id:1, 'fieldType': 'viewText', 'label': 'Rif.ordine cliente', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{id:2, 'fieldType': 'viewText', 'label': 'Denominazione agente', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{id:3, 'fieldType': 'viewText', 'label': 'Condizione pagamento', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:4,'fieldType': 'viewText', 'label': 'Metodo pagamento', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];

const totali_ordine = [{ id:1,'fieldType': 'viewText', 'label': 'Totale q.ta ordine', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{id:2, 'fieldType': 'viewText', 'label': 'Totale euro ordine', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];

const dati_spedizione = [{ id:1,'fieldType': 'viewText', 'label': 'Descrizione ubicazione', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];

const annotazione = [{id:1, 'fieldType': 'viewText', 'label': 'Nota da riportare sul ddt', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{id:2, 'fieldType': 'viewText', 'label': 'Nota per Elah', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:3,'fieldType': 'viewText', 'label': 'Nota in caso di Omaggi Area', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];

const invio = [{id:1, 'fieldType': 'viewText', 'label': 'Fax', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id:2,'fieldType': 'viewText', 'label': 'E-mail', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];

  return (
                        <Card bgColor="#f9f9f9">
                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Date ordine "></Title>
                                    </div>
                                    <div className="row">
                                        {date_ordineFields?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>

                            <Tabs defaultActiveKey="cliente" id="uncontrolled-tab-example" className="button_tab_block" >
                                <Tab eventKey="cliente" title="CLIENTE">
                                    <Card>
                                        <div className="row">
                                            {clienteFields?.map((it) => {
                                                return (
                                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                                        label={it.label} value={it.value}
                                                        colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
                                                )
                                            })}
                                        </div>
                                    </Card>
                                </Tab>

                                <Tab eventKey="fatturazione" title="FATTURAZIONE">
                                    <Card>
                                        <div className="row">
                                            {fatturazioneFields?.map((it) => {
                                                return (
                                                    <FieldEl key={it.id} fieldType={it.fieldType}
                                                        label={it.label} value={it.value}
                                                        colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
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
                                                        colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
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
                                                    colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
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
                                                    colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>


                            <Card>
                                <div className="row">
                                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                        <Title heading="Dati spedizione "></Title>
                                    </div>
                                    <div className="row">
                                        {dati_spedizione?.map((it) => {
                                            return (
                                                <FieldEl key={it.id} fieldType={it.fieldType}
                                                    label={it.label} value={it.value}
                                                    colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
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
                                                    colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
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
                                                    colArr={it.colArr} field={''} onchangeHandler={null} options={undefined} />
                                            )
                                        })}
                                    </div>
                                </div>
                            </Card>

                            <Card>
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">

                                        <Title heading="Ordine creato create da"></Title>

                                        <section>
                                            <div className="table_section">
                                                <div className="inner-content">
                                                    <div className="inner-table-content">
                                                        <div className="table-responsive">
                                                            <table className="table-main table table-striped table-borderless">
                                                                <tbody>
                                                                <tr>
                                                                    <th>UTENTE</th>
                                                                    <th>DATA</th>
                                                                    <th style={{ 'color': 'red' }}>CARICATO DA MOBILE</th>

                                                                </tr>
                                                                <tr>
                                                                    <td>Administrator</td>
                                                                    <td>05-04-2022 06:48:21 AM</td>
                                                                    <td style={{ 'color': 'red' }}>NO</td>
                                                                </tr>
                                                                </tbody>
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
                                                            <tbody>
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
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </section>

                                    </div>

                                </div>
                            </Card>

                        </Card>
  )
}

export default OrdineTestataTab;