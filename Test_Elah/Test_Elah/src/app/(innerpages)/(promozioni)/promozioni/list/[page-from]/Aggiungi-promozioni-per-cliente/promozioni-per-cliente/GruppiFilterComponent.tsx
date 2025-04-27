import React, { useEffect } from 'react'
import { filterType } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';


type Props = {

    filter: filterType;
    onChangeHandler: any;
 
}

const GruppoFilterComponent = (props: Props) => {
    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;

    //Options used in filter fields
    const 	SupergruppiOptions = [{ label: 'Tutti', value: '' }, { label: 'getFromApi', value: 'api' }];

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
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label:'Supergruppi', field: 'supergrouppo', value: filter.supergrouppo,
            placeholder: null, onchangeHandler: onchangeHandler,  clickHandler: null, options: SupergruppiOptions
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
                       // onClick={}
                    >
                        Resettare
                    </button>
                    <button
                        type="button"
                        className="site_btn brdr_btn"
                        //onClick={}
                    >
                        Cerca
                    </button>
                </div>
            </div>
        </section>
    )
}
export default GruppoFilterComponent;

