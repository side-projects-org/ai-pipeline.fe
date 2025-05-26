import React from "react";
import styled from "styled-components";

interface InputProps {
    label: string
    options: any[];
    defaultValue: any;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    height?: string;
}


const LabeledSelect = ({label, options, defaultValue, onChange, height}: InputProps) => {

    return (
        <>
            <SelectContainer $height={height ?? "5rem"}>
                <Label>{label}</Label>
                <SelectWrapper>
                    <Select defaultValue={defaultValue} onChange={onChange}>
                        {options.map((option, index) => (
                            <Option key={index} value={option.value}>
                                {option.label}
                            </Option>
                        ))}
                    </Select>
                </SelectWrapper>

            </SelectContainer>

        </>
    );
}


const SelectContainer = styled.div<{ $height?: string }>`
    width: 100%;
    height: ${props => props.$height};
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
`;

const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
`;

const Label = styled.label`
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: bold;
`;
const Select = styled.select`
    height: 100%;
    line-height: 2rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    padding: 0 1rem;
`;

const Option = styled.option``;


export default LabeledSelect;
