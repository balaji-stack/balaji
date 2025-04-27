"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React from 'react'
import FieldEl from '@/app/components/shared/FieldEl'

type Props = {
    onchangeHandler : any;
}

const page = (props: Props) => {
    const onchangeHandler = props.onchangeHandler;

  return (
    <main>
    <div className="page_title">
        <div className="row">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                <Title heading="BUDGET OMAGGI"></Title>

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
                <Card>
                    <div className="row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                            <Title heading="Setup Omaggi"></Title>
                        </div>
                        <div className="row">

                            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    {setup_omaggi?.map((it) => {
                                        return (
                                            <FieldEl key={it.id} fieldType={it.fieldType}
                                            label={it.label} value={it.value}
                                            colArr={it.colArr} field={''} onchangeHandler={onchangeHandler} options={undefined}  />
                                        )
                                    })}
                                </div>
                            </div>

                            <div className="col-xxl-7 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
                                <section>
                                    <div className="table_section">
                                        <div className="inner-content">
                                            <div className="inner-table-content">
                                                <div className="table-responsive">
                                                    <table className="table-main table table-striped">

                                                        <tr>
                                                            <th>Quadrimestre</th>
                                                            <td className='title_td'>PERIODO 1</td>
                                                            <td className='title_td'>PERIODO 2</td>
                                                            <td className='title_td'>PERIODO 3</td>

                                                        </tr>

                                                        <tr>
                                                            <th>Budget</th>
                                                            <td> <input type="text" className="form-control w-50 h-50" /></td>
                                                            <td> <input type="text" className="form-control w-50 h-50"/></td>
                                                            <td> <input type="text" className="form-control w-50 h-50" /></td>
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
                        <div className="btn_grp_inner">
                                <button type="button"  className="site_btn brdr_btn">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>

                </Card>
                </Card>

    </main>

  )
}

const setup_omaggi = [{ id:1, 'fieldType': 'input', 'label': 'Area', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] },
{ id:2 ,'fieldType': 'input', 'label': 'Anno', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] }];



export default page