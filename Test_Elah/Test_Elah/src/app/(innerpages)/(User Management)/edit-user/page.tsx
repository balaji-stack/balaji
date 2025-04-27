"use client"
import UserDetails from '../shared/UserDetails'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import DettaglioLogin from '../shared/DettaglioLogin';
import DettaglioPassword from '../shared/DettaglioPassword';
import Permissions from '../shared/Permissions';
import SERVER_URL from '@/helpers/common'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import AgenteSearch from '@/app/components/shared/AgenteSearch';
import FullPageLoader from '@/app/components/shared/FullPageLoader';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import Link from 'next/link';
import Image from 'next/image';
import ArrowDown from '@/img/arrow-down.png';
import { popupMsg } from '@/helpers/messages';
import { updateUrlObject } from '@/redux/slices/action-slice';


// import {DevTool} from "@hookform/devtools"

type FormValues = {
  userId: string;
  userName: string;
  userSurname: string;
  userEmail: string;
  userLogin: string;
  password: string;
  retypepassword: string;
  passwordHash: string;
  passwordSalt: string;
  ispasswordnull: boolean,
  passwordChanged: boolean,
  xyz: string;
  type: { label: string, value: string };
  agente: string;
  location?: { label: string, value: string };
  activeStatus?: { label: string, value: string };
  passwordvalidity: number;
  last_password_change: string;
  next_password_change: string;
  cusermgtperm: boolean;
  cnavdocperm: boolean;
  URLesterno: boolean;
  cpromozioniperm: boolean;
  cassortimentiperm: boolean;
  corderentryperm: boolean;
  sassortimentiportalperm: boolean;
  portalassortment: string[];
  spromozioiportalperm: boolean;
  portalpromozioni: string[];
  swebordiniperm: boolean;
  webordini: string[];
  swebordiniindependentiperm: boolean;
  webordiniindependenti: string[];
  smerchandisingperm: boolean;
  merchant: string[];
  creportsperm: boolean;
  csubreportperm: string[];
  snotifyperm: boolean;
  notifications: string[];

};

const UpdateUser = () => {
  const userId = useSelector((state: any) => state.action.urlParamObject?.userId); 
  const [superAdmin,setSuperAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const reduxDispatch = useDispatch();

  const schema: any = yup.object().shape({
    userName: yup.string().required("Inserisci il nome"),
    userSurname: yup.string().required("Inserisci il cognome"),
    userEmail: yup.string().email("Per cortesia controlla la e-mail").required("Per cortesia controlla la e-mail")
      .test("validate email", (val, { createError }) => {
        const regValid = new RegExp(/^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/);
        const isValid = regValid.test(val);
        return isValid ? true : createError({ message: "Per cortesia controlla la e-mail" });
      }),
    userLogin: yup.string().required("Per cortesia inserire il login")
      .test('validate', (val, { createError }) => {
        const regValid = new RegExp(/^(\d|\w)+$/);
        const isValid = regValid.test(val);
        return isValid ? true : createError({ message: "Il codice login non può contenere caratteri speciali" });
      }),
    password: yup.string().required('Per cortesia inserire la password')
      .test("Valid password", (val, { createError }) => {
        let passwordChanged = dirtyFields.password;
        if (passwordChanged) {
          const regValid = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/);
          const isValid = regValid.test(val);
          return isValid ? true : createError({ message: "La password deve contenere almeno una lettera maiuscola,una minuscola, una cifra e deve contenere più di 8 caratteri" });
        } else {
          return true;
        }
      }),
    retypepassword: yup.string().required('Per cortesia ri-digitare la password')
      .oneOf([yup.ref('password')], 'La password non coincide'),
    type: yup.object()
      .required("Seleziona il tipo di utente"),
    passwordvalidity: yup.string().required("Inserisci la validità della password")
      .test("validate password validity", (val, { createError }) => {
        let regValid = new RegExp(/^(?!0$)[1-9]\d*$/);
        let isValid = regValid.test(val);
        return isValid ? true : createError({ message: "Inserisci un numero intero valido." });
      }),
    agente: yup.string().when('type', (type, schema) => {
      let userType = type[0]?.value?.toString();//we get type as array of objects
      let agenteRequired = type == null || type == undefined || userType === "2" || userType === "3";
      return agenteRequired ? schema.required("Per cortesia inserire il codice agente")
        .test("check valid code",
          (async (val, { createError }) => {
            const URL = `${SERVER_URL}/user/checkAgentCodeByUserid`;
            let result: string = "";
            await axios.get(URL, {
              withCredentials: true,
              params: {
                userId,
                code: val
              }
            }).then((res: any) => {
              result = res.data;
            });
            switch (result) {
              case "INVALID":
                return createError({ message: "Codice agente non valido" });
              case "DUPLICATE":
                return createError({ message: "Il codice agente è già  assegnato ad un altro utente" });
              default:
                return true;
            };
          }
          ))
        :
        schema;
    })
    ,
    location: yup.object().when('type', (type, schema) => {
      let userType = type[0]?.value?.toString();//we get type as array of objects 
      return userType === "3" ? schema
        .required("Seleziona la posizione").shape({
          label: yup.string(),
          value: yup.string().required("Seleziona la posizione")
        })
        : schema;
    }),
    activeStatus: yup.object()
      .required("Seleziona lo stato")
      .test("check wheather status selected",
        (val: any, { createError }) => {
          return val?.value == "" ? createError({ message: "Seleziona lo stato" }) : true;
        }),
  });
  let data: any;
  const form = useForm<FormValues>({
    defaultValues: async () => {
      setIsLoading(true);
      let url = `${SERVER_URL}/user/getUser?userId=${userId}`;
      await fetch(url, {
        method: 'get',
        credentials: 'include'
      })
        .then(response => response.json())
        .then(resData => {
          data = resData;
          setSuperAdmin(data.type.value === "0");
        }).catch((e: AxiosError) => {
          let status = e.status;
          if (status === 401) {
              popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
              router.push('/login');
          } else {
              popupMsg("qualcosa è andato storto", "error");
          }
      }).finally(() => {
        setIsLoading(false);
       })
      let password = data.password ?? "abcd"; 
      let locationObj = data.location == null || data.location?.value == "0" ? { label: '', value: '' } : data.location;
      let passwordExpiry = data.passwordExpiry?.expiration_days ?? "0";
      let formData: FormValues = {
        userId: userId,
        userName: data.userName,
        userSurname: data.userSurname,
        userEmail: data.userEmail,
        userLogin: data.userLogin,
        password: password,
        retypepassword: password,
        passwordHash: data.passwordHash,
        passwordSalt: data.passwordSalt,
        ispasswordnull: data.ispasswordnull,
        passwordChanged: false,
        xyz: data.xyz,
        type: data.type,
        agente: data.agente,
        location: locationObj,
        activeStatus: data.activeStatus,
        passwordvalidity: passwordExpiry,
        last_password_change: new Date(passwordExpiry).toLocaleDateString("it-IT"),
        next_password_change: new Date(passwordExpiry).toLocaleDateString("it-IT"),
        cusermgtperm: data.cusermgtperm == "1",
        cnavdocperm: data.cnavdocperm == "1",
        URLesterno: data.cassortimentiperm == '1' || data.cpromozioniperm == '1' || data.corderentryperm == '1',
        cpromozioniperm: data.cpromozioniperm == "1",
        cassortimentiperm: data.cassortimentiperm == "1",
        corderentryperm: data.corderentryperm == "1",
        sassortimentiportalperm: data.sassortimentiportalperm == "1",
        portalassortment: data.crudOperationPermissions?.filter((obj: any) => obj.section_identifier == 'ASSORTIMENTI')?.map((obj: any) => obj.operation_identifier),
        spromozioiportalperm: data.spromozioiportalperm == "1",
        portalpromozioni: data.crudOperationPermissions?.filter((obj: any) => obj.section_identifier == 'PROMOZIONI')?.map((obj: any) => obj.operation_identifier),
        swebordiniperm: data.swebordiniperm == "1",
        webordini: data.crudOperationPermissions?.filter((obj: any) => obj.section_identifier == 'WEBORDINI')?.map((obj: any) => obj.operation_identifier),
        swebordiniindependentiperm: data.swebordiniindependentiperm == "1",
        webordiniindependenti: data.crudOperationPermissions?.filter((obj: any) => obj.section_identifier == 'WEBORDINIINDEPENDENTI')?.map((obj: any) => obj.operation_identifier),
        smerchandisingperm: data.smerchandisingperm == "1",
        merchant: data.crudOperationPermissions?.filter((obj: any) => obj.section_identifier == 'MERCHANDISING')?.map((obj: any) => obj.operation_identifier),
        creportsperm: data.creportsperm == "1",
        csubreportperm: data.subreport?.map((obj: any) => obj.subreport_identifier),
        snotifyperm: data.snotifyperm == "1",
        notifications: data.crudOperationPermissions?.filter((obj: any) => obj.section_identifier == 'NOTIFICATIONS')?.map((obj: any) => obj.operation_identifier),
      };
      return formData;
    },
    resolver: yupResolver(schema), mode: "all"
  });

  const {
    register, control, handleSubmit, formState,
    watch, getValues, setValue, trigger, clearErrors,
  } = form;
  const { errors, dirtyFields } = formState;
  const onsubmitFn = async (data: FormValues) => {
    data.passwordChanged = Object.keys(dirtyFields).includes("password");//returns true if password changed
    let permissionExist: boolean = data.cusermgtperm || data.cnavdocperm || data.URLesterno || data.sassortimentiportalperm
      || data.spromozioiportalperm || data.swebordiniperm || data.swebordiniindependentiperm || data.smerchandisingperm
      || data.creportsperm || data.snotifyperm;

    if (!permissionExist) {//All users must have permissions to save.
      popupMsg("Per cortesia selezionare le permissions da assegnare", "info");
      return false;
    }
    setIsLoading(true);
    let successMsg = "Successfully Updated";
    let URL = `${SERVER_URL}/user/userUpdate`;
    if (data.userId == "null") {
      URL = `${SERVER_URL}/user/registerUser`;
      successMsg = "Successfully Added";
    }
    axios.post(URL, data, {
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    })
      .then((res: any) => {
        setIsLoading(false);
        if (res.data === 'success') {
          popupMsg(successMsg, "success");
          router.push('/users');
        }
        else if (res.data === 'session_time_out') {
          popupMsg("Sessione scaduta! Effettua il login per continuare", "info");
          router.push("/");
        }
        else if (res.data === 'User Already Exist' || res.data === 'Agent Already Exist') {
          popupMsg("Utente già esistente", "info");
        }
        else {
          popupMsg(res.data, "error");
        }
      }).catch((e: AxiosError) => {
        let status = e.status;
        if (status === 401) {
          popupMsg("L'utente non autorizzato o la sessione è scaduta.", "error");
          router.push('/login');
        } else {
          popupMsg("qualcosa è andato storto", "error");
        }
      })

  }
  const onerrorFn = (error: any) => {
    console.log(error)
  }
  const [openUpdateUser, setOpenUpdateUser] = useState<boolean>(true);
  const [showAgentSearch, setshowAgentSearch] = useState(false);

  const showAgentHandler = () => {
    setshowAgentSearch(true);
    setOpenUpdateUser(false);
  }

  const chooseAgenteHandler = (value: any) => {
    setValue("agente", value);
    trigger("agente");
    setshowAgentSearch(false);
    setOpenUpdateUser(true);
  }

  const closeAgenteHandler = () => {
    setshowAgentSearch(false);
    setOpenUpdateUser(true);
  }
  function handleduplicateuser(e: any): void {
    setValue('userLogin', "");
    setValue("userId", "null");
    setValue('password', "");
    setValue('retypepassword', "");
    setValue('userName', "");
    setValue('userSurname', "");
    setValue('userEmail', "");
    setValue('agente', "");
    watch("type").value === "3" && setValue("location", {label: "", value: ""});
    e.parentNode.parentNode.removeChild(e.parentNode);
  }
  let dettaglioLoginProps = { register, errors, control, getValues, setValue, watch, trigger, showAgentHandler, clearErrors };
  let agenteSearchProps = { selectedAgent: watch("agente"), chooseAgenteHandler, closeAgenteHandler };
  return (
    <>
      {isLoading ? <FullPageLoader /> :
        <>
          <Card bgColor="#ffffff" padding={30} borderRadius={15} marginBottom={30}>
            <div className={`title_filter_block ${openUpdateUser ? "filter_title_tog" : ""}`}>
              <div className="title_block-arrow">
                <button
                  type="button"
                  className="filter-arrow"
                  onClick={() => setOpenUpdateUser(!openUpdateUser)}
                >
                  <Image src={ArrowDown} alt="Image" />
                </button>
              </div>
            </div>
            <div
              className={`form_block ${openUpdateUser ? "filter_show" : ""}`}
              style={{ 'display': 'none' }}
            >
              <div className="content_form content_form-filter">
                <div className="page_content ">
                  <form
                    onSubmit={handleSubmit(onsubmitFn, onerrorFn)}>
                    <input type='hidden' {...register("userId")} />
                    <div className="pg_title" >
                      <div className="mb-3 row">
                        <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                          <Title
                            heading="GESTIONE UTENTI"
                            textColor="#0069ba"
                            fontSize={20}
                            fontWeight={600}
                          />
                        </div>
                        <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12 ">
                          <div className="top_btn_grp" >
                            <ul>
                              <li>
                                <button type="button" className="site_btn primary_btn shadow" onClick={(e) => handleduplicateuser(e.target)}>
                                  Duplica utente
                                </button>
                              </li>
                              <li>
                                <Link href="/users" onClick={()=> reduxDispatch(updateUrlObject({ userId: 0 }))}>
                                  Ritorna
                                </Link>
                              </li>
                            </ul>

                          </div>

                        </div>
                      </div>

                    </div>
                    <UserDetails register={register} errors={errors} getValues={getValues}
                      setValue={setValue} handleduplicateuser={handleduplicateuser} trigger={trigger} clearErrors={clearErrors} />
                   {!superAdmin &&<>
                    <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form_block content_form"  >
                        <div className="row" >
                          <DettaglioLogin {...dettaglioLoginProps} />
                          <DettaglioPassword register={register} errors={errors} getValues={getValues} />
                        </div>
                      </div>
                    </div>
                     <Permissions register={register} control={control} setValue={setValue} /></>}
                    <div className="btn_grp" id="updatebutton" >
                      <button type="submit" className="site_btn primary_btn shadow" >
                        Submit
                      </button>
                    </div>

                  </form>
                  <ToastContainer /> {/* this is for notifications */}
                </div>
              </div>
            </div>
          </Card>

          {showAgentSearch && <div id="agent_search">
            <AgenteSearch {...agenteSearchProps} />
          </div>}
        </>
      }
    </>
  )
}

export default UpdateUser;





