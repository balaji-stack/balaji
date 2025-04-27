import FilterFieldEl from '@/app/components/shared/FilterFieldEl';
import React, { useState } from 'react'

type Props = {}
type selectField = { label: string, value: string };
export type filterType = {

    //datas of refrenze-add
    tcodice: string,
    ttitle: string,
    spromotionespositori: selectField,
    spromotionmarchio: selectField,
    spromotionlinea: selectField,
    spromotionmacrofamiglia: selectField,

}

export const initialValue = {

    tcodice: '',
    ttitle: '',
    spromotionespositori:  { label: '', value: '' },
    spromotionmarchio:  { label: '', value: '' },
    spromotionlinea:  { label: '', value: '' },
    spromotionmacrofamiglia:  { label: '', value: '' },

}
const Referenze_addFilterComponent = (props: Props) => {


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
    const EspositoriOptions = [{ label: 'getFromApi', value: 'api' }];
    const MarchioOptions = [{ label: 'Tutti', value: '' }];
    const LineaOptions = [{ label: 'Tutti', value: '' }];
    const MacrofamigliaOptions = [{ label: 'Tutti', value: '' }];

    const filterFields = [
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'tcodice', value: filter.tcodice,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },
        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Titolo', field: 'ttitle', value: filter.ttitle,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },

        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Espositori', field: 'spromotionespositori', value: filter.spromotionespositori,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: EspositoriOptions
        },

        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Marchio', field: 'spromotionmarchio', value: filter.spromotionmarchio,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: MarchioOptions
        },

        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Linea', field: 'spromotionmacrofamiglia', value: filter.spromotionmacrofamiglia,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: LineaOptions
        },


        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Macro-famiglia', field: 'ssottogruppo', value: filter.spromotionmacrofamiglia,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: MacrofamigliaOptions
        }


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

export default Referenze_addFilterComponent