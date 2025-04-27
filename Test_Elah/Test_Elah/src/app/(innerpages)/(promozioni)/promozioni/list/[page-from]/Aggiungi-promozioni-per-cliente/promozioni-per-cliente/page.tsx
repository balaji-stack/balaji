"use client"
import React, { useState } from 'react';
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import { Tab, Tabs } from "react-bootstrap";
import GruppiFilterComponent from "./GruppiFilterComponent"



type Props = {}

export type filterType = {
    //datas of gruppi
    grouppocode: string,
    grouppodescription: string,
    supergrouppo: {label: string, value: string},

    //datas of sotto gruppi
    sottogroupcode: string,
    sottogroupdesc: string,
    sottosupersottogroupscode: {label: string, value: string},
    subgroupscode: {label: string, value: string},

    // datas of punti vendita
    tcodicerep: string,
    tsocialerep: string,
    tSearchName: string,
    tcity: string,
    tpv: string,
    tagentname: string,
    ssupergruppo: {label: string, value: string},
    sgruppo: {label: string, value: string},
    ssottogruppo: {label: string, value: string}
}


export const initialValue = {
   //datas of gruppi
   grouppocode: '',
   grouppodescription: '',
   supergrouppo: {label:'',value: ''},

   //datas of sotto gruppi
   sottogroupcode: '',
   sottogroupdesc: '',
   sottosupersottogroupscode: {label:'',value: ''},
   subgroupscode: {label:'',value: ''},

   // datas of punti vendita
   tcodicerep:'',
   tsocialerep: '',
   tSearchName: '',
   tcity: '',
   tpv: '',
   tagentname: '',
   ssupergruppo: {label:'',value: ''},
   sgruppo: {label:'',value: ''},
   ssottogruppo: {label:'',value: ''}

}

const Page = (props: Props) => { 

    const [filter, setFilter] = useState<filterType>(initialValue);

    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }


    return (
        <main>
            <div className="row">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <Title heading="PROMOZIONI PER CLIENTI"></Title>
                </div>
            </div>

            <div className="tab_block">
                <Tabs
                    defaultActiveKey="gruppi" id="uncontrolled-tab-example" className="button_tab_block" >
                    <Tab eventKey="gruppi" title="GRUPPI">

                        <Card>

                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                                    <Title heading="RICERCA"></Title>
                                </div>
                            </div>
                            <GruppiFilterComponent filter={filter} onChangeHandler={onChangeHandler} />
                        </Card>
                        <Card>
                            <div className="table_data">
                                <div className="title_sec">
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <Title heading="Lista"></Title>
                                        </div>
                                    </div>
                                </div>
                                {/* <AggiungipromozioniTable filter={filter} /> */}
                            </div>
                        </Card>

                    </Tab>

                    <Tab eventKey="sotto-gruppi" title="SOTTO GRUPPI">
                        tab2
                    </Tab>

                    <Tab eventKey="punti-vendita" title="PUNTI VENDITA">
                        tab3
                    </Tab>


                </Tabs>
            </div>
        </main>
    )
}

export default Page