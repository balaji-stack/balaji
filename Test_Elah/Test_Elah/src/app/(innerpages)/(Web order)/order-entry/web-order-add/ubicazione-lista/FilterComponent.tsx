"use client"
import React from 'react'
import { filterType } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';


type Props = {
    filter: filterType;
    onChangeHandler: any;
    searchHandler: any;
    
}

const FilterComponent = (props: Props) => {

    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;
    const searchHandler = props.searchHandler;
   


    const filterFields = [
        {
            id: 1, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'codice', 
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },

        {
            id: 2, fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Descrizione', field: 'description', 
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
    ]
    return (
        <section>
            <div className="row">
                {
                    filterFields?.map((it: any) => {
                        return (
                            <FilterFieldEl key={it.id} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
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

export default FilterComponent