"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import FieldEl from '@/app/components/shared/FieldEl'
import { date_reso, clienteTabFields, spedizioneFields, dati_reso, totali_reso, dati_spedizione, annotazione, riferimenti, Id_reso }
  from './helper';
import FilterComponent from './FilterComponent'
import { useRouter } from 'next/navigation'



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

  const router = useRouter();


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
        <div className="tab_block">
          <Tabs defaultActiveKey="reso testata" id="uncontrolled-tab-example" className="button_tab_block" >
            <Tab eventKey="reso testata" title="RESO TESTATA">

              <Card>
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                    <Title heading="Date reso "></Title>
                  </div>
                  <div className="row">
                    {date_reso?.map((it) => {
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
                    <Title heading="Dati reso"></Title>
                  </div>

                  <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-6 col-6" style={{ 'color': 'red' }}>
                    NOTA:VALORE NON U SATO PER ALCUN CALCOLO MA SOLO A TITOLO INFORMATIVO PER L'AMMINISTRAZIONE

                  </div>

                  <div className="row">
                    {dati_reso?.map((it) => {
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
                    <Title heading="Totali reso "></Title>
                  </div>
                  <div className="row">
                    {totali_reso?.map((it) => {
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
                    <Title heading="Dati spedizione "></Title>
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
                    <Title heading="Riferimenti nota di credito"></Title>
                  </div>
                  <div className="row">
                    {riferimenti?.map((it) => {
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
                    <Title heading="Reso creato create da"></Title>

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

                  </Card>
                </div>

                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                  <Card>
                    <Title heading="Reso modificato da"></Title>
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
                                  <td>Administrator</td>
                                  <td>Non autorizzato</td>
                                  <td>05-04-2022 06:48:21 AM</td>
                                </tr>

                              </table>
                            </div>
                          </div>
                        </div>

                      </div>
                    </section>
                  </Card>
                </div>

              </div>

              <Card>
                <Title heading="Autorizzazione logging"></Title>
                <section>
                  <div className="table_section">
                    <div className="inner-content">
                      <div className="inner-table-content">
                        <div className="table-responsive">
                          <table className="table-main table table-striped table-borderless">
                            <tr>
                              <th>UTENTE</th>
                              <th>TIPO AUTORIZZAZIONE </th>
                              <th>TASK</th>
                              <th>DATA</th>
                              <th>ANNOTAZIONE</th>
                            </tr>
                            <tr>
                              <td>Administrator</td>
                              <td>Administrative Manager</td>
                              <td>Non autorizzato</td>
                              <td>05-04-2022 06:48:21 AM</td>
                              <td>no</td>
                            </tr>

                          </table>
                        </div>
                      </div>
                    </div>

                  </div>
                </section>

              </Card>

            </Tab>

            <Tab eventKey="reso righe" title="RESO RIGHE(0 RECORDS)">
              <Card>
                <div className="row">
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                    <Title heading="ID reso"></Title>
                  </div>
                  <div className="row">
                    {Id_reso?.map((it) => {
                      return (
                        <FieldEl key={it.id} fieldType={it.fieldType}
                          label={it.label} value={it.value}
                          colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                      )
                    })}
                  </div>
                </div>
              </Card>

              <FilterComponent filter={filter} onChangeHandler={onchangeHandler} searchHandler={searchHandler} />

              <Card>
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                  <Title heading="Righe reso"></Title>
                </div>
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
                                <th>Fatt.Nr.</th>
                                <th>Fatt.Riga</th>
                                <th>DDT Nr.</th>
                                <th>DDT Riga</th>
                                <th>DDT Data</th>
                                <th>Ord.Nr.</th>
                                <th>Ord.Riga</th>
                                <th>Causale Riga</th>
                                <th>Pz.Cartone </th>
                                <th>DDT UM</th>
                                <th>Cartone/Expo Spediti</th>
                                <th>Quantita Vendita</th>
                                <th>Resi Prec.</th>
                                <th>Pz.Vend.</th>
                                <th>Imp.Netto</th>
                                <th>Val.Pezzo</th>
                                <th>UM Reso</th>
                                <th>Qt.a Reso</th>

                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                              <td onClick={() => router.push('/common/dettaglio-articolo')}><Link href={''}>click</Link></td>
                                <td>Codice</td>
                                <td>Descrizione</td>
                                <td>Fatt.Nr.</td>
                                <td>Fatt.Riga</td>
                                <td>DDT Nr.</td>
                                <td>DDT Riga</td>
                                <td>DDT Data</td>
                                <td>Ord.Nr.</td>
                                <td>Ord.Riga</td>
                                <td>Causale Riga</td>
                                <td>Pz.Cartone</td>
                                <td>DDT UM</td>
                                <td>Cartone/Expo Spediti</td>
                                <td>Quantita Vendita</td>
                                <td>Resi Prec.</td>
                                <td>Pz.Vend.</td>
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
            </Tab>
          </Tabs>
        </div>

      </Card>
     
    </main>
  )
}

export default page