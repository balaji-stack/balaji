import React,{useEffect} from 'react'
import { filterType } from './page';
import FilterFieldEl from '../FilterFieldEl';


type Props ={

    filter :filterType;
    onChangeHandler :any ;
    searchHandler :any;
    resetHandler :any;
}

const FilterComponent =(props:Props) =>{
    const onchangeHandler = props.onChangeHandler;
    const filter = props.filter;
    const searchHandler = props.searchHandler;
    const resetHandler = props.resetHandler;

useEffect(() =>
{

},[])

const filterFields=[
    {
        fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'campagnaCode', value: filter.campagnaCode,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
        fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Descrizione', field: 'campagnaDescription', value: filter.campagnaDescription,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },


    {
        fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: 'Periodo', field: 'campagnaDateFrom', value: filter.campagnaDateFrom,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    },
    {
        fieldType: 'date', colArr: [2, 2, 3, 6, 6, 6], label: null, field: 'campagnaDateTo', value: filter.campagnaDateTo,
        placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
    }

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

                    <button type="button" className="site_btn primary_btn" onClick={resetHandler}>
                    Resettare
                    </button>

                    <button  type="button"  className="site_btn brdr_btn" onClick={searchHandler}>
                    Cerca
                   </button>
            </div>
        </div>
    </section>
)
        }

export default FilterComponent;