"use client"
import Title from '@/app/components/shared/Title'
import React, { useState } from 'react'
import FilterComponent from './FilterComponent';
import Card from '@/app/components/shared/Card';
import UbicazioneTable from './UbicazioneTable';


type Props = {

}

export type filterType = {
    codice: string,
    description: string,
}

export const initialValue: filterType = {
    codice: '',
    description: '',

};

const page = (props: Props) => {


    const [filter, setFilter] = useState<filterType>(initialValue);

    const onChangeHandler = (key: string, value: string) => {

    }


    const searchHandler = () => {


    }


    return (
        <main>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                <Title heading="UBICAZIONE LISTA"></Title>
            </div>
            <Card>
                <div className="row">
                    <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                        searchHandler={searchHandler} />
                </div>
            </Card>
            <Card>
            <div className="table_data">
                                <div className="title_sec">
                                    <div className="row">
                                        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                            <Title heading="Ubicazione lista"></Title>
                                        </div>

                                    </div>
                                </div>
                              
                     
                            </div>
                <UbicazioneTable />
            </Card>
        </main>


    )
}

export default page