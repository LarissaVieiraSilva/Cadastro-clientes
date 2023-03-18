import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Checkbox from "./Checkbox";


const FormContainer = styled.form`
  display: flex;
  width: 79vw;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 10px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.sobrenome.value = onEdit.sobrenome;
      user.profissao.value = onEdit.profissao;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.fone;
      user.data_nascimento.value = onEdit.data_nascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = ref.current;    

    if (
      !user.nome.value ||
      !user.sobrenome.value ||
      !user.profissao.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value 
    ) {
      return toast.warn("Preencha todos os campos!");
    }

    
    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.id, {
          nome: user.nome.value,
          sobrenome: user.sobrenome.value,
          profissao: user.profissao.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          nome: user.nome.value,
          sobrenome: user.sobrenome.value,
          profissao: user.profissao.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.sobrenome.value = "";
    user.profissao.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>Sobrenome</Label>
        <Input name="sobrenome" />
      </InputArea>
      <InputArea>
        <Label>Profissão</Label>
        <Input name="profissao" />
      </InputArea>
      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>
      <InputArea>
        <Label>Telefone</Label>
        <Input name="fone" />
      </InputArea>
      <InputArea>
        <Label>Dt. Nascimento</Label>
        <Input name="data_nascimento" type="date" />
      </InputArea>

      <Checkbox/>
      
      <Button type="submit">SALVAR</Button>
      
      
      
    </FormContainer>
  );
};



export default Form;
