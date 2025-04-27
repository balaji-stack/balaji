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
import { useState } from 'react';
import AgenteSearch from '@/app/components/shared/AgenteSearch';
import axios, { AxiosError } from 'axios';
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FullPageLoader from '@/app/components/shared/FullPageLoader';
import { popupMsg } from '@/helpers/messages';
import Card from '@/app/components/shared/Card';
import Title from '@/app/components/shared/Title';
import Image from 'next/image';
import ArrowDown from '@/img/arrow-down.png';
import Link from 'next/link';
// import {DevTool} from "@hookform/devtools"

type FormValues = {
  userId: string;
  userName: string;
  userSurname: string;
  userEmail: string;
  userLogin: string;
  password: string;
  retypepassword: string;
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

const AddUser = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
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
    .required("Seleziona il tipo di utente")
    .test("check is type selected",
      (val:any,{createError})=>{
      return val?.value == ""? createError({ message: "Seleziona il tipo di utente" }) : true;
    }),
    passwordvalidity: yup.string().required("Inserisci la validità della password")
      .test("validate password validity", (val, { createError }) => {
        let regValid = new RegExp(/^(?!0$)[1-9]\d*$/);
        let isValid = regValid.test(val);
        return isValid ? true : createError({ message: "Inserisci un numero intero valido." });
      }),
    agente: yup.string().when('type', (type, schema) => {
      let userType = type[0]?.value?.toString();//we get type as array of objects
      let agenteRequired =  type == null || type == undefined || userType === "2" || userType === "3";
      return agenteRequired ? schema.required("Per cortesia inserire il codice agente")
        .test("check valid code",
          (async (val, { createError }) => {
            const URL = `${SERVER_URL}/user/checkAgentCode`;
            let result: string = "";
            await axios.get(URL, {
              withCredentials: true,
              params: {
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
    location: yup.object().when('type',(type, schema)=>{
      let userType = type[0]?.value?.toString();//we get type as array of objects 
      return userType === "3" ? schema
      .required("Seleziona la posizione").shape({
        label: yup.string(),
        value: yup.string().required("Seleziona la posizione") 
      }): schema;
    }),
    activeStatus: yup.object()
    .required("Seleziona lo stato")
    .test("check wheather status selected",
      (val:any,{createError})=>{
      return val?.value == ""? createError({ message: "Seleziona lo stato" }) : true;
    }),
  });
  const form = useForm<FormValues>({
    defaultValues: {
      userId: "",
      userName: "",
      userSurname: "",
      userEmail: "",
      userLogin: "",
      password: "",
      retypepassword: "",
      type: { label: '', value: '' },
      agente: "",
      location: { label: '', value: '' },
      activeStatus: { label: '', value: '' },
      passwordvalidity: 90,
      last_password_change: "-",
      next_password_change: "-",
      cusermgtperm: false,
      cnavdocperm: false,
      URLesterno: false,
      cpromozioniperm: false,
      cassortimentiperm: false,
      corderentryperm: false,
      sassortimentiportalperm: false,
      portalassortment: [],
      spromozioiportalperm: false,
      portalpromozioni: [],
      swebordiniperm: false,
      webordini: [],
      swebordiniindependentiperm: false,
      webordiniindependenti: [],
      smerchandisingperm: false,
      merchant: [],
      creportsperm: false,
      csubreportperm: [],
      snotifyperm: false,
      notifications: [],

    },
    resolver: yupResolver(schema), mode: "all",
  });

  const {
    register, control, handleSubmit, formState,
    watch, getValues, setValue, trigger, clearErrors
  } = form;


  const { errors, dirtyFields } = formState;


  const onsubmitFn = async (data: FormValues) => {
    let permissionExist: boolean = data.cusermgtperm || data.cnavdocperm || data.URLesterno || data.sassortimentiportalperm
      || data.spromozioiportalperm || data.swebordiniperm || data.swebordiniindependentiperm || data.smerchandisingperm
      || data.creportsperm || data.snotifyperm;
    if (!permissionExist) {//All users must have permissions to save.
      popupMsg("Per cortesia selezionare le permissions da assegnare", "info");
      return false;
    }
    setIsLoading(true);
    const URL = `${SERVER_URL}/user/registerUser`;
    await axios.post(URL, data, {
      withCredentials: true
    }).then((res) => {
      setIsLoading(false);
      if (res.data === 'success') {
        popupMsg("successo", "success");
        router.push('/users');
      }
      else if (res.data === 'session_time_out') {
        popupMsg("Sessione scaduta! Effettua il login per continuare", "info");
        router.push('/');
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
  }).finally(() => { })
    
  }

  const onerrorFn = (error: any) => {
    console.log(error);
  }

  const [openAddUser, setOpenAddUser] = useState<boolean>(true);
  const [showAgentSearch, setshowAgentSearch] = useState(false);

  const showAgentHandler = () => {
    setshowAgentSearch(true);
    setOpenAddUser(false);
  }

  const chooseAgenteHandler = (value: any) => {
    setValue("agente", value);
    trigger("agente");
    setshowAgentSearch(false);
    setOpenAddUser(true);
  }

  const closeAgenteHandler = () => {
    setshowAgentSearch(false);
    setOpenAddUser(true);
  }
  let dettaglioLoginProps = {register,errors,control,getValues,setValue,watch,trigger,showAgentHandler,clearErrors};
  let agenteSearchProps = { selectedAgent: watch("agente"), chooseAgenteHandler, closeAgenteHandler };
  return (
    <>
      {isLoading ? <FullPageLoader /> :
        <>
          <Card bgColor="#ffffff" padding={20} borderRadius={15} marginBottom={30}>

            <div className="page_content ">
              <form onSubmit={handleSubmit(onsubmitFn, onerrorFn)}>

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
                            <Link href="/users">
                              Ritorna
                            </Link>
                          </li>
                          <li>
                            <div className={`title_filter_block ${openAddUser ? "filter_title_tog" : ""}`}>
                              <div className="title_block-arrow">
                                <button
                                  type="button"
                                  className="filter-arrow"
                                  onClick={() => setOpenAddUser(!openAddUser)}
                                >
                                  <Image src={ArrowDown} alt="Image" />
                                </button>
                              </div>
                            </div>
                          </li>
                        </ul>

                      </div>

                    </div>
                  </div>

                </div>
                <div
                  className={`form_block ${openAddUser ? "filter_show" : ""}`}
                  style={{ 'display': 'none' }}
                >
                  <div className="content_form content_form-filter">
                    <UserDetails register={register} errors={errors} getValues={getValues}
                      setValue={setValue} trigger={trigger} clearErrors={clearErrors} />

                    <div className=" col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form_block content_form" >
                        <div className="row" >
                          <DettaglioLogin {...dettaglioLoginProps} />
                          <div className="col-xxl-1 col-xl-1 col-lg-1 col-md-1 col-sm-12 col-12"></div>
                          <DettaglioPassword register={register} errors={errors} getValues={getValues} />
                        </div>
                      </div>
                    </div>
                    <Permissions register={register} control={control} setValue={setValue} />
                    <div className="btn_grp">
                      <button type="submit" className="site_btn primary_btn shadow">
                        Submit
                      </button>
                    </div>
                  </div></div>
              </form>
            </div>
            {/* <DevTool control={control}/> */}
            <ToastContainer /> {/* this is for notifications */}
          </Card>
          {showAgentSearch && <div id="agent_search">
            <AgenteSearch {...agenteSearchProps} />
          </div>}
        </>
      }
    </>
  )
}

export default AddUser