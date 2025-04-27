import React, { forwardRef, useEffect } from 'react'
import Image from "next/image";
import calenderimg from "@/img/calender.png";
import { filterType } from './page';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { it } from "date-fns/locale";
import SERVER_URL from '@/helpers/common';
//import axios from 'axios';
import { calenderimgStr } from '@/helpers/images';
//registerLocale("it", it);
type Props = {
    filter: filterType;
    onChangeHandler: any;
    resetHandler: any;
    searchHandler: any;
}

const FilterComponent = (props: Props) => {
    const filter = props.filter;
    const onchangeHandler = props.onChangeHandler;
    const resetHandler = props.resetHandler;
    const searchHandler = props.searchHandler;

    const DateInput = forwardRef((props: any, ref: any) => (
        <button className="date_input form-control" onClick={props.onClick} ref={ref}>
            {props.value}
            <span className="icon_txtbox">
                <Image src={calenderimg} alt="Image"></Image>
            </span>
        </button>
    ));


    DateInput.displayName = "DateInput";
    return (
        <section>
            <div className="row">

                <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                    <div className="form-group">
                        <label>Utente</label>
                        <input
                            type="text"
                            value={filter.logname}
                            className="form-control"
                            onChange={(e) => {
                                onchangeHandler("logname", e.target.value)
                            }
                            }
                        />
                    </div>
                </div>
                <div className='col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12'>
                    <div className="form-group">
                        <label>Periodo</label>
                        {/* <DatePicker
                            locale="it"
                            className="form-control"
                            dateFormat="dd-MM-yyyy"
                            customInput={<DateInput />}
                        /> */}
                        <DatePicker
                            showIcon
                            toggleCalendarOnIconClick
                            locale="it"
                            className="form-control"
                            dateFormat="dd-MM-yyyy"
                            selected={filter.operationDate}
                            scrollableYearDropdown
                            icon={<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1794" height="1794" viewBox="0 0 1794 1794">
                                <image id="calendar" width="1794" height="1794" xlinkHref={calenderimgStr} />
                            </svg>}
                            calendarIconClassname='calender-icon-datepicker'
                            onChange={(date: any) => {
                                onchangeHandler("operationDate", date);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="btn_grp">
                <div className="btn_grp_inner">
                    <button type="button" className="site_btn primary_btn" onClick={resetHandler}>
                    Resettare
                    </button>
                    <button type="button" className="site_btn brdr_btn" onClick={searchHandler}>
                        Cerca
                    </button>
                </div>
            </div>
        </section>
    )
}

export default FilterComponent