import React, { useEffect } from 'react'
import { filterType } from './NavisionIntegrationListLink';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';

type Props = {

    filter : filterType;
    onChangeHandler : any;
    searchHandler : any;
    resetHandler : any;
}

const FilterComponent = (props: Props) => {

    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;
    const searchHandler = props.searchHandler;
    const resetHandler = props.resetHandler;


    const filterFields = [
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'codice', value: filter.codice,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
       
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Descrizione', field: 'description', value: filter.description,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
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
export default FilterComponent