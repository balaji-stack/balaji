"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import React from 'react'
import FieldEl from '@/app/components/shared/FieldEl';
import closeImg from '@/img/close.png';
import Image from "next/image";

type Props = {

    onchangeHandler: any;
}

const page = (props: Props) => {

    const onchangeHandler = props.onchangeHandler;

    return (
        <main>
            <div className="row">
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                    <Title heading="VIEW BUDGET"></Title>
                </div>

            </div>

            <Card bgColor="#f9f9f9">
                <Card>
                    <div className="row">
                        {/* <div className="title_block-arrow">
                            <button type="button" onClick={closeBudgetValoriHandler}><Image src={closeImg} alt="Image" /></button>
                        </div> */}
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <Title heading="Setup Omaggi"></Title>
                        </div>
                        <div className="row">

                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    {setup_omaggi?.map((it) => {
                                        return (
                                            <FieldEl key={it.id} fieldType={it.fieldType}
                                                label={it.label} value={it.value}
                                                colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined} />
                                        )
                                    })}
                                </div>



                            </div>

                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                <section>
                                    <div className="table_section">
                                        <div className="inner-content">
                                            <div className="inner-table-content">
                                                <div className="table-responsive">
                                                    <table className="table-main table table-striped table-borderless">

                                                        <tr>
                                                            <th>Quadrimestre</th>
                                                            <td className='title_td'>PERIODO 1</td>
                                                            <td className='title_td'>PERIODO 2</td>
                                                            <td className='title_td'>PERIODO 3</td>

                                                        </tr>

                                                        <tr>
                                                            <th>Budget</th>
                                                            <td>4.000,00</td>
                                                            <td>100,00</td>
                                                            <td>8.000,00</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Totale gia utilizzato</th>
                                                            <td>150,00</td>
                                                            <td>0,00</td>
                                                            <td>0,00</td>
                                                        </tr>

                                                        <tr>
                                                            <th>Saldo</th>
                                                            <td>3.850,00</td>
                                                            <td>100,00</td>
                                                            <td>8.000,00</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </section>
                            </div>

                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="row">

                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ display: 'flex', justifyContent: 'end' }}>

                            <button type="button" className="site_btn brdr_btn">
                                OK
                            </button>


                        </div>
                    </div>

                </Card>

            </Card>


        </main>
    )
}


const setup_omaggi = [{ id: 1, 'fieldType': 'viewText', 'label': 'Area', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] },
{ id: 2, 'fieldType': 'viewText', 'label': 'Anno', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] },
{ id: 3, 'fieldType': 'viewText', 'label': 'Valore utilizzato', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] },
{ id: 4, 'fieldType': 'viewText', 'label': 'Quadrimestre', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] },
{ id: 4, 'fieldType': 'viewText', 'label': 'Totale da autorizzare', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] }];


export default page