import React from 'react'
import { filterType } from './page';
import FilterFieldEl from '@/app/components/shared/FilterFieldEl';

type Props = {

    filter: filterType;
    onChangeHandler: any;
    resetHandler: any;
    searchHandler: any;

}

const AreaFilterComponent = (props: Props) => {

    const filter = props.filter;
    const onchangeHandler = props.onChangeHandler;
    const resetHandler = props.resetHandler;
    const searchHandler = props.searchHandler;

    const CausaleOptions = [{ label: 'get from api', value: '' }];
    const TipoOptions = [{ label: 'get from api', value: '' }];
    const MarchioOptions = [{ label: 'Tutti', value: '' }, { label: 'get from api', value: '0' }];
    const LineaOptions = [{ label: 'Tutti', value: '' }];
    const MacroOptions = [{ label: 'Tutti', value: '' }];

    const filterFields = [
        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Causale di default', field: 'causalearea', value: filter.causalearea,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: CausaleOptions
        },

        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Codice', field: 'soscodice', value: filter.soscodice,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },

        {
            fieldType: 'input', colArr: [4, 4, 6, 12, 12, 12], label: 'Titolo', field: 'sostitle', value: filter.sostitle,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: null
        },

        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Tipo', field: 'sositemtype', value: filter.sositemtype,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: TipoOptions
        },

        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Marchio', field: 'sosmarchio', value: filter.sosmarchio,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: MarchioOptions
        },


        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Linea', field: 'soslinea', value: filter.soslinea,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: LineaOptions
        },

        {
            fieldType: 'select', colArr: [4, 4, 6, 12, 12, 12], label: 'Macro-famiglia', field: 'sosmacrofamiglia', value: filter.sosmacrofamiglia,
            placeholder: null, onchangeHandler: onchangeHandler, clickHandler: null, options: MacroOptions
        },


    ]

    return (
        <section>
            <div className="row">
                {filterFields?.map((it: any, i: number) => {
                    let keyIndex = i;
                    return (
                        <FilterFieldEl key={keyIndex} fieldType={it.fieldType} colArr={it.colArr} label={it.label}
                            field={it.field} value={it.value} placeholder={it.placeholder} onchangeHandler={it.onchangeHandler}
                            clickHandler={it.clickHandler} options={it.options} />
                    )
                })}

            </div>
            <div className="row">
                <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">

                    <div className="mb-4">
                        <input id="mostrasolo" className="form-check-input" type="checkbox" />
                        <label htmlFor="mostrasolo" className="form-check-label">Mostra solo referenze assortimento in validita</label>
                    </div>

                </div>
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

export default AreaFilterComponent