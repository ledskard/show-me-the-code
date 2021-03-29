import React, {useState} from "react";
import { useForm } from "react-hook-form";

import Field from "../Field";
import Form from "../Form";
import Button from "../Button";
import axios from "axios";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const FormNew = () => {

    const schema = yup.object().shape({
        source: yup.string().required("O campo Origem é obrigatório."),
        destiny: yup.string().required("O campo Destino é obrigatório."),
        plan: yup.string().required("O campo Plano é obrigatório."),
        timeCall: yup.string().required("O campo Minutos Falados é obrigatório."),
    });
    
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const [ valueWithPlan, setValueWithPlan ] = useState();
    const [ valueWithoutPlan, setValueWithoutPlan ] = useState();

    const calculateCall = async (phonePlan) => {
        await axios.post(`http://localhost:8082/call/info/populate`);
            let axiosResponse = await axios.post(`http://localhost:8082/call/info/calculate`, phonePlan);
            setValueWithPlan(axiosResponse.data.valueWithPlan);
            setValueWithoutPlan(axiosResponse.data.valueWithoutPlan);   
    };

    return (
        <Form onSubmit={handleSubmit(calculateCall)}>
            <Field.Text label="Origem" name="source" type="text" register={register}/>
            <div style={{color: "#f00"}}>{errors.source?.message}</div>
            <Field.Text label="Destino" name="destiny" type="text" register={register}/>
            <div style={{color: "#f00"}}> {errors.destiny?.message}</div>
            <Field.Text label="Plano de telefone" name="plan" type="text" register={register}/>
            <div style={{color: "#f00"}}>{errors.plan?.message}</div>
            <Field.Text label="Minutos falados" name="timeCall" type="integer" register={register}/>
            <div style={{color: "#f00"}}>{errors.timeCall?.message}</div>
            <Button>Enviar</Button>
            <div>
                <p style={{color: "#fff", fontSize: "20px", padding: "10px"}}>Valor do plano com desconto é: {valueWithPlan}</p>
                <p style={{color: "#fff", fontSize: "20px", padding: "10px"}}>Valor do plano sem desconto é: {valueWithoutPlan}</p>
            </div>
        </Form>
    )
};

export default FormNew;