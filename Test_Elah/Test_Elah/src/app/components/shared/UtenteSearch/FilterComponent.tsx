import React, {useEffect} from 'react'
import { filterType } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';

type Props = {

    filter :filterType;
    onChangeHandler :any ;
    searchHandler :any;
    showUtenteHandler: any;
}

const FilterComponent = (props: Props) => {

    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;
    const searchHandler = props.searchHandler;
    const showUtenteHandler = props.showUtenteHandler;

    const TipoOptions = [{ label: 'Tutti', value: '' }, {label: 'Admin', value: ''} , {label: 'Capo area', value: ''} , {label: 'Agente', value: ''}] ;

    useEffect(() =>
    {
    
    },[])

    const filterFields=[
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Cognome Nome', field: 'CreatedUserName', value: filter.CreatedUserName,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
    
        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Tipo', field: 'susertype', value: filter.susertype,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: TipoOptions
          },
      
      

    ]

  return (
    <section>
        <div className="row">
            {
                filterFields?.map((it: any,i: number) => {
                    let keyIndex = i;
                    return (
                        <FilterFieldEl key={keyIndex} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
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
                <button
                      type="button"
                      className="site_btn primary_btn"
                      onClick={() => showUtenteHandler(false)}
                    >
                      Back
                    </button>
            </div>
        </div>
    </section>
  )
}

export default FilterComponent