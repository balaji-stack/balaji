import Title from '@/app/components/shared/Title';
import SERVER_URL from '@/helpers/common';
import { useEffect, useState } from 'react';
import { attivoSelectOptions, userTypes } from '../helper/UserUtils';
import textBoxSearch from '../../../../img/txt_box_search.png';
import Image from "next/image";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { popupMsg } from '@/helpers/messages';
import { Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
type Props = {
    register: any;
    errors: any;
    control: any;
    getValues: any;
    setValue: any;
    watch?: any;
    trigger?: any;
    showAgentHandler: any;
    clearErrors: any;
}

const DettaglioLogin = (props: Props) => {
    const router = useRouter();
    const [Locations, setLocations] = useState([]);
    const getArea = async () => {
        const url = `${SERVER_URL}/user/locationlist`;
        // Using the AXIOS library to make a POST request
        await axios.get(url, {
            withCredentials: true,
        })
            .then(response => {
                if (response.data.msg == "session_time_out") {
                    popupMsg("Sessione scaduta! Effettua il login per continuare", "info");
                    router.push("/");
                }
                else {
                    let options = response.data.locations
                        ?.map((code: string) => {
                            return { label: code, value: code }
                        })
                    setLocations(options);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    useEffect(() => {
        getArea();
    }, [])

    let userType = props.watch("type")?.value;
    let disableAgente = userType == "1" || userType == "" || userType == undefined ;
    return (
        <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
            <div className="title_block">
                <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <Title
                        heading="Dettaglio login"
                        textColor="#3e3c4f"
                        fontSize={20}
                        fontWeight={600}
                        bottomSpace={15}
                    />
                </div>
            </div>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="row">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-group">
                            <label htmlFor='type'>Tipo</label>
                            <div className="cntrl_grp">
                                <Controller
                                    name="type"
                                    control={props.control}
                                    render={({ field }) => (
                                        <CreatableSelect
                                            className='custom-select-picker'
                                            classNamePrefix="nw"
                                            isClearable
                                            {...field}
                                            onChange={(option) => {
                                                if (option?.value == "1" || option?.value == null) {
                                                    props.setValue("agente", "");
                                                    props.clearErrors("agente");
                                                    props.setValue("location", { label: '', value: '' });
                                                    props.clearErrors("location");
                                                } else if (option?.value == "2") {
                                                    props.setValue("location", { label: '', value: '' });
                                                    props.clearErrors("location");
                                                }
                                                field.onChange(option);
                                            }}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            options={userTypes}
                                        />
                                    )}
                                />
                            </div>
                            <p className='error_msg'>{props.errors.type?.message}</p>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-group grp_cntrls">
                            <label htmlFor='agente'>Agente</label>
                            <div className={`cntrl_grp icon_txtbox_cntrl ${disableAgente ? "disabled_div" : ""}`}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Inserisci qui il codice agente"
                                    {...props.register("agente")}
                                    disabled={disableAgente}
                                />
                                <button type="button" className="icon_txtbox" onClick={props.showAgentHandler}
                                    style={{ pointerEvents: disableAgente ? 'none' : 'all' }}>
                                    <Image src={textBoxSearch} alt="Image" />
                                </button>
                            </div>
                            <p className='error_msg'>{props.errors.agente?.message}</p>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-group">
                            <label htmlFor='location'>Località</label>
                            <div className={`cntrl_grp ${userType == "3" ? '' : 'disabled_div'}`}>
                                <Controller
                                    name="location"
                                    control={props.control}
                                    render={({ field}) => (
                                        <CreatableSelect
                                            className='custom-select-picker'
                                            classNamePrefix="nw"
                                            isClearable
                                            {...field}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            options={Locations}
                                            isDisabled={userType != "3"}
                                        />
                                    )}
                                />
                            </div>
                            <p className='error_msg'>{props.errors.location?.value?.message}</p>
                        </div>
                    </div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="form-group">
                            <label htmlFor='activeStatus'>Attivo</label>
                            <div className="cntrl_grp">
                                <Controller
                                    name="activeStatus"
                                    control={props.control}
                                    render={({ field }) => (
                                        <CreatableSelect
                                            className='custom-select-picker'
                                            classNamePrefix="nw"
                                            isClearable
                                            {...field}
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            value={field.value}
                                            options={attivoSelectOptions}
                                        />
                                    )}
                                />
                            </div>
                            <p className='error_msg'>{props.errors.activeStatus?.message}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Card> */}
        </div >

    )
}

export default DettaglioLogin