"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React from 'react'
import FieldEl from '@/app/components/shared/FieldEl'

type Props = {

  onchangeHandler: any;

}

const page = (props: Props) => {

  const onchangeHandler = props.onchangeHandler;

  return (
    <main>
      <div className="row">
        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
          <Title heading="DETTAGLIO ARTICOLO"></Title>
        </div>

      </div>

      <Card>
        <div className="row">
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
            <Title heading="Anagrafici articolo"></Title>
          </div>
          <div className="row">
            {anagrafici?.map((it) => {
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
            <Title heading="Prezzi articolo"></Title>
          </div>
          <div className="row">
            {prezzi_articolo?.map((it) => {
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
          <Title heading="Venduto anno corrente"></Title>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <Title heading="Mese precedente"></Title>

            <section>
              <div className="table_section">
                <div className="inner-content">
                  <div className="inner-table-content">
                    <div className="table-responsive">
                      <table className="table-main table table-striped table-borderless">
                        <tr>
                          <th>PERIODO</th>
                          <th>QUANTITA</th>
                          <th>PRICE</th>
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

          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <Title heading="Ultimo ordine"></Title>

            <section>
              <div className="table_section">
                <div className="inner-content">
                  <div className="inner-table-content">
                    <div className="table-responsive">
                      <table className="table-main table table-striped table-borderless">
                        <tr>
                          <th>NUMERO</th>
                          <th>DATA</th>
                        </tr>
                        <tr>
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

          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <Title heading="Ultimo consegna"></Title>
            <section>
              <div className="table_section">
                <div className="inner-content">
                  <div className="inner-table-content">
                    <div className="table-responsive">
                      <table className="table-main table table-striped table-borderless">
                        <tr>
                          <th>NUMERO</th>
                          <th>DATA</th>
                        </tr>
                        <tr>
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
          <Title heading="Venduto anno precedente"></Title>
          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <Title heading="Mese precedente"></Title>

            <section>
              <div className="table_section">
                <div className="inner-content">
                  <div className="inner-table-content">
                    <div className="table-responsive">
                      <table className="table-main table table-striped table-borderless">
                        <tr>
                          <th>PERIODO</th>
                          <th>QUANTITA</th>
                          <th>PRICE</th>
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

          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <Title heading="Mese corrente"></Title>

            <section>
              <div className="table_section">
                <div className="inner-content">
                  <div className="inner-table-content">
                    <div className="table-responsive">
                      <table className="table-main table table-striped table-borderless">
                        <tr>
                          <th>PERIODO</th>
                          <th>QUANTITA</th>
                          <th>PRICE</th>
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

          <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <Title heading="Mese consegna"></Title>
            <section>
              <div className="table_section">
                <div className="inner-content">
                  <div className="inner-table-content">
                    <div className="table-responsive">
                      <table className="table-main table table-striped table-borderless">
                        <tr>
                          <th>PERIODO</th>
                          <th>QUANTITA</th>
                          <th>PRICE</th>
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







    </main>
  )
}

const anagrafici = [{ id: 1, 'fieldType': 'viewText', 'label': 'Codice articolo', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 2, 'fieldType': 'viewText', 'label': 'Descrizione articolo', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 3, 'fieldType': 'viewText', 'label': 'Codice marchio', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 4, 'fieldType': 'viewText', 'label': 'Codice linea', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 5, 'fieldType': 'viewText', 'label': 'Codice macro-familia', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 6, 'fieldType': 'viewText', 'label': 'Q.ta per confezione', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 7, 'fieldType': 'viewText', 'label': 'Unita di misura', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];


const prezzi_articolo = [{ id: 1, 'fieldType': 'viewText', 'label': 'Prezzo di vendita', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 2, 'fieldType': 'viewText', 'label': '% Sconto canvas', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 3, 'fieldType': 'viewText', 'label': 'Prezzo scontato', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] },
{ id: 4, 'fieldType': 'viewText', 'label': 'Prezzo di listino singola unita di vendita', 'value': '', 'colArr': [4, 4, 4, 12, 12, 12] }];



export default page