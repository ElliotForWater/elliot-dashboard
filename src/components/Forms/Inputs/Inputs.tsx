import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useRef, useEffect } from 'react'
import classnames from 'classnames'
import styles from './Inputs.module.css'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: any // declare register props
  errors?: any
  type: 'text' | 'email' | 'number' | 'checkbox' | 'search' | 'radiobox'
  rules?: any
  name: string
  customClassname?: string
}
export function Input({ name, type, register, rules = {}, errors = {}, customClassname, ...rest }: InputProps) {
  const { ref, ...restInputEl } = register('firstName')
  const firstNameRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (rest.autoFocus && firstNameRef.current) {
      firstNameRef.current.focus()
    }
  }, [])

  return (
    <div className={type === 'checkbox' || type === 'radiobox' ? styles.inputWrapInline : styles.inputWrap}>
      <input
        className={classnames({ [styles.inputError]: errors[name] }, customClassname, styles.input)}
        type={type}
        {...register(name, rules)}
        ref={(e) => {
          ref(e)
          firstNameRef.current = e
        }}
        {...restInputEl}
        {...rest}
      />

      {errors[name] && <div className={styles.error}>{errors[name].message}</div>}
    </div>
  )
}

interface optionsProps {
  value: string | number
  label: string
}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  register: any // declare register props
  errors?: any
  rules?: any
  name: string
  options: optionsProps[]
}
export function Select({ options, name, register, rules = {}, errors = {}, ...rest }: SelectProps) {
  return (
    <select className={styles.select} {...register(name, rules)} {...rest}>
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label || value}
        </option>
      ))}
    </select>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: any // declare register props
  errors?: any
  rules?: any
  name: string
  rows: number
  customClassname?: string
}
export function Textarea({ name, rows, register, customClassname, rules = {}, errors = {}, ...rest }: TextareaProps) {
  return (
    <div className={styles.inputWrap}>
      <textarea
        className={classnames({ [styles.inputError]: errors[name] }, customClassname, styles.textarea)}
        name={name}
        {...register(name, rules)}
        rows={rows}
        {...rest}
      />
    </div>
  )
}
