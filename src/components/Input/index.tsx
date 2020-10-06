import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react'
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles'
import ToolTip from '../Tooltip'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({name, icon: Icon, ...rest}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  // get an element of the DOM so we can
	// change/get its value and props
  const inputRef = useRef<HTMLInputElement>(null);
  const {fieldName, defaultValue, error, registerField} = useField(name);
  useEffect(() => {
    registerField({
      name:fieldName,
      ref: inputRef.current,
      path: 'value'
    });
  }, [fieldName, registerField])

  // If we create the function in the normal way, it will be created in memory everytime
  // the component is renderized
  // With the useCallback the function is created only when something specific ([]) changes
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    /* if(inputRef.current?.value) {
      setIsFilled(true);
    } else {
      setIsFilled(false)
    } */

    setIsFilled(!!inputRef.current?.value);
  }, [])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, [])

  return (
    <Container isErrored={!!error} isFilled={isFilled} isFocused={isFocused}>
      { Icon && <Icon size ={ 20 }></Icon> }
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && <Error title={error}>
          <FiAlertCircle color="#c53030" size={20}/>
        </Error>}
    </Container>
    );
}
export default Input;
