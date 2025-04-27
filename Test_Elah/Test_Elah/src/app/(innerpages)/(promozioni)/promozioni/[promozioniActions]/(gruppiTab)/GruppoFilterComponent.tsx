import FilterFieldEl from '@/app/components/shared/FilterFieldEl';
import React, { useEffect, useState } from 'react'


type Props = {}

type selectField = { label: string, value: string };

export type filterType = {

    //datas of gruppi
    grouppocode: string,
    grouppodescription: string,
    refrnzsupergrouppo: selectField,
}

export const initialValue = {
    grouppocode: '',
    grouppodescription: '',
    refrnzsupergrouppo:  { label: '', value: '' }

}

const GruppoFilterComponent = (props: Props) => {

    const [filter, setFilter] = useState<filterType>(initialValue);

    const onchangeHandler = (key: string, value: string) => {
        setFilter({ ...filter, [key]: value })
    }

    const resetHandler = () => {
        setFilter({ ...initialValue });
    }

    const searchHandler = () => {
    }


    //Options used in filter fields
    const SupergruppiOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: 'api' }];

    useEffect(() => {
        //getareaoptions
    }, [])


    const filterFields = [
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'grouppocode', value: filter.grouppocode,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Descrizione', field: 'grouppodescription', value: filter.grouppodescription,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Supergruppi', field: 'refrnzsupergrouppo', value: filter.refrnzsupergrouppo,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: SupergruppiOptions
        },

    ]
    return (
        <section>
            <div className="row">

                {
                    filterFields?.map((it: any,i: number) => {
                        return (
                            <FilterFieldEl key={i} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
                                field={it.field} value={it.value} placeholder={it.placeholder} onchangeHandler={it.onchangeHandler}
                                clickHandler={it.clickHandler} options={it.options} />
                        )
                    })
                }

            </div>
            <div className="btn_grp">
                <div className="btn_grp_inner">
                    <button
                        type="button"
                        className="site_btn primary_btn"
                        onClick={resetHandler}
                    >
                        Resettare
                    </button>
                    <button
                        type="button"
                        className="site_btn brdr_btn"
                        onClick={searchHandler}
                    >
                        Cerca
                    </button>
                </div>
            </div>
        </section>
    )
}
export default GruppoFilterComponent;

