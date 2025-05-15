import React from "react";
import styled from "styled-components";

interface InputProps {
    label: string
    type: 'text' | 'number' | 'email' | 'password';
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}



const LabeledInput = ({ label, type, value, onChange, placeholder }: InputProps) => {
    return (
        <InputWrapper>
            <Label>{label}</Label>
            <Input type={type} value={value} onChange={onChange} placeholder={placeholder}/>
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    flex-direction: row;
    line-height: 2rem;
    padding: 0.5rem;
`;

const Label = styled.label`
    width: 30%;
    height: 100%;
`;

const Input = styled.input`
    width: 70%;
    height: 100%;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding-left: 1rem;
`;

export default LabeledInput;
