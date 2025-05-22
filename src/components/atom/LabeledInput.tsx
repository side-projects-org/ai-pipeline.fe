import React from "react";
import styled from "styled-components";

interface InputProps {
    label: string
    type: 'text' | 'number' | 'email' | 'password';
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    guideLine?: string;
    guideColor?: 'red' | 'blue';
    validate?: (value: any) => boolean;
    height?: string;
}



const LabeledInput = ({ label, type, value, onChange, placeholder, validate, guideLine, guideColor, height }: InputProps) => {
    const color = guideColor ?? "black";

    const isValid = validate ? validate(value) : true;

    return (
        <>
            <InputContainer $height={height ?? "5rem"}>
                <Label>{label}</Label>
                <InputWrapper>
                    <Input type={type} value={value} onChange={onChange} placeholder={placeholder}/>
                    {!isValid && guideLine && (<GuideLine $color={color}>{guideLine}</GuideLine>)}
                </InputWrapper>

            </InputContainer>

        </>
    );
}


const InputContainer = styled.div<{ $height?: string }>`
    width: 100%;
    height: ${props => props.$height};
    display: flex;
    flex-direction: row;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
`;

const Label = styled.label`
    width: 30%;
    height: 70%;
    display: flex;
    align-items: center;
`;

const GuideLine = styled.div<{ $color: string }>`
    color: ${props => props.$color};
    font-size: 0.8rem;
    height: 30%;
    padding: 0.3rem 0 0 1rem;
`;

const Input = styled.input`
    height: 70%;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding-left: 1rem;
`;

export default LabeledInput;
