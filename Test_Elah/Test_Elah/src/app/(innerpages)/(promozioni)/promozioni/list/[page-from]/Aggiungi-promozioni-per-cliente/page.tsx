"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/app/components/shared/Card'
import Title from '@/app/components/shared/Title'
import FilterComponent from './FilterComponent'
import AggiungipromozioniTable from './AggiungipromozioniTable'
import {useRouter} from 'next/navigation';
import Link from 'next/link'


type Props = {}
export type filterType = {

    areaCode: string,
    areaDescr: string,

}
export const initialValue: filterType = {
    areaCode: '',
    areaDescr: '',

};
const Page = (props: Props) => {

    const [filter, setFilter] = useState<filterType>(initialValue);
    const router = useRouter();

    const onChangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }
    const resetHandler = () => {
        setFilter({ ...initialValue });
    }

    const searchHandler = () => {

    }

    return (
        <main>
            <Card>

                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-9 col-9">
                        <Title heading="PROMOZIONI PER CLIENTE"></Title>
                    </div>
                </div>
                <FilterComponent filter={filter} onChangeHandler={onChangeHandler}
                    resetHandler={resetHandler} searchHandler={searchHandler} />
            </Card>
            <Card>
                <div className="table_data">
                    <div className="title_sec">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <Title heading="Lista aree"></Title>
                            </div>
                        </div>
                    </div>
                    <AggiungipromozioniTable filter={filter} />
                </div>
            </Card>

            <button
                type="button"
                className="site_btn primary_btn"
                onClick={()=> router.push("/gestione-promozioni/Aggiungi-promozioni-per-cliente/promozioni-per-cliente")}
            >
                Continua
            </button>

        </main>
    )
}

export default Page