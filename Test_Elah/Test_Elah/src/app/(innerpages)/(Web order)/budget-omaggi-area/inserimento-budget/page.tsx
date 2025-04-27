"use client"

import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import Link from 'next/link'
import React from 'react'
import FieldEl from '@/app/components/shared/FieldEl'

type Props = {
    onChangeHandler: any;
}

const page = (props: Props) => {

    const AreaOptions = [{ label: 'getfromApi', value: '' }];
    const AnnoOptions = [{ label: 'getfromApi', value: '' }];

    const onchangeHandler = props.onChangeHandler;


    const setup_omaggi = [{ id: 1, 'fieldType': 'select', 'label': 'Area', 'value': '', 'field': '', 'colArr': [6, 6, 6, 12, 12, 12], onchangeHandler: onchangeHandler ,options: AreaOptions },
    { id: 2, 'fieldType': 'select', 'label': 'Anno', 'value': '', 'field': '', 'colArr': [6, 6, 6, 12, 12, 12], onchangeHandler: onchangeHandler  ,options: AnnoOptions  }];
    
    


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

                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                    {setup_omaggi?.map((it) => {
                                        return (
                                            <FieldEl key={it.id} fieldType={it.fieldType}
                                            label={it.label} value={it.value}
                                            colArr={it.colArr} field={''} onchangeHandler={it.onchangeHandler} options={it.options}  />
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
                                                    <table className="table-main table table-striped">

                                                        <tr>
                                                            <th>Quadrimestre</th>
                                                            <td className='title_td'>PERIODO 1</td>
                                                            <td className='title_td'>PERIODO 2</td>
                                                            <td className='title_td'>PERIODO 3</td>

                                                        </tr>

                                                        <tr>
                                                            <th></th>
                                                            <td> <input type="text" className="form-control w-50 h-50" /></td>
                                                            <td> <input type="text" className="form-control w-50 h-50" /></td>
                                                            <td> <input type="text" className="form-control w-50 h-50" /></td>
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







export default page