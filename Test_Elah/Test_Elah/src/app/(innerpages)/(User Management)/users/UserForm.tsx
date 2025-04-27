import React from "react";
import textBoxSearch from '../../../../img/txt_box_search.png';
import Image from "next/image";
import { UserDataType } from "./page";
import { userTypes } from "../helper/UserUtils";
import CreatableSelect from 'react-select/creatable'

type properties = {
    User: UserDataType;
    changeHandler: any;
    searchHandler: any;
    resetHandler: any;
    showAgentHandler: any;
}

const UserForm = (props: properties) => {
    const User = props.User;
    const changeHandler = props.changeHandler;
    const searchHandler = props.searchHandler;
    const resetHandler = props.resetHandler;
    const showAgentHandler = props.showAgentHandler;
    return (
        <main>
            <div className="row">
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Login</label>
                        <div className="cntrl_grp">
                            <input
                                type="text"
                                id="login"
                                value={User.userLogin}
                                className="form-control"
                                placeholder="Inserisci il login utente"
                                onChange={(e) => changeHandler('userLogin', e.target.value)}
                                onKeyDown={(e) => { 
                                    if (e.key === "Enter") {
                                        searchHandler()
                                    } 
                                }} 
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Nome</label>
                        <div className="cntrl_grp">
                            <input
                                type="text"
                                id="userName"
                                value={User.userName}
                                className="form-control"
                                placeholder="Inserisci il nome"
                                onChange={(e) => changeHandler('userName', e.target.value)}
                                onKeyDown={(e) => { 
                                    if (e.key === "Enter") {
                                        searchHandler()
                                    } 
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Cognome</label>
                        <div className="cntrl_grp">
                            <input
                                type="text"
                                id="surname"
                                value={User.userSurname}
                                className="form-control"
                                placeholder="Inserisci il cognome"
                                onChange={(e) => changeHandler('userSurname', e.target.value)}
                                onKeyDown={(e) => { 
                                    if (e.key === "Enter") {
                                        searchHandler()
                                    } 
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Agente</label>
                        <div className="cntrl_grp icon_txtbox_cntrl">
                            <input
                                type="text"
                                id="agent"
                                value={User.userAgentCode}
                                className="form-control"
                                placeholder="Scegli l'agente"
                                onChange={(e) => { changeHandler("userAgentCode", e.target.value) }}
                                onKeyDown={(e) => { 
                                    if (e.key === "Enter") {
                                        searchHandler()
                                    } 
                                }}
                            />
                            <button type="button" className="icon_txtbox" onClick={showAgentHandler}>
                                <Image src={textBoxSearch} alt="Image" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                        <label>Tipo</label>
                        <div className="cntrl_grp">
                            <CreatableSelect isClearable className='custom-select-picker'
                                id="selectUserType"
                                classNamePrefix="nw"
                                options={userTypes}
                                value={User.selectUserType} onChange={(value: any) => {
                                    changeHandler('selectUserType', value)
                                }}
                                onKeyDown={(e) => { 
                                    if (e.key === "Enter") {
                                        searchHandler()
                                    } 
                                }}
                                />
                        </div>
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
        </main>
    );
};

export default UserForm;
