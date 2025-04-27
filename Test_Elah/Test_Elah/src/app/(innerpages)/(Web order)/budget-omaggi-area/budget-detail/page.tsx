"use client"
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React from 'react'
import FieldEl from '@/app/components/shared/FieldEl'
import { useRouter } from 'next/navigation'

type Props = {}

const page = (props: Props) => {
    const router = useRouter()
    return (
        <main>
            <div className="page_title">
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                        <Title heading="BUDGET DETAIL"></Title>

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
                            <Title heading="Setup Omaggi"></Title>
                        </div>
                        <div className="row">

                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                <div className="row">
                                    {setup_omaggi?.map((it) => {
                                        return (
                                            <FieldEl key={it.id} fieldType={it.fieldType}
                                                label={it.label} value={it.value}
                                                colArr={it.colArr} />
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

{/* This modifica button don't need in budget-omaggi-area menu budget details Page
 need to give this button in condition */}


                <Card>
                    <div className="row">

                        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12" style={{ display: 'flex', justifyContent: 'end' }}>

                            <button type="button" className="site_btn brdr_btn"
                                onClick={() => router.push('./budget-detail-edit')}>
                                Modifica
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
{ id: 4, 'fieldType': 'viewText', 'label': 'Quadrimestre', 'value': '', 'colArr': [6, 6, 6, 12, 12, 12] }];

export default page