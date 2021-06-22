import React, { useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { Input, Select } from '../Inputs/Inputs'
import ButtonPrimary from '../../Buttons/ButtonPrimary/ButtonPrimary'
import TextButton from '../../Buttons/TextButton/TextButton'
import { UserContext } from '../../../context/UserContext'
import styles from './SettingsForm.module.css'

type InputsProp = {
  language: number
  adultContentFilter: number
  openInNewTab: boolean
}

const SettingsForm = ({ callbackCloseSettings }) => {
  const { userState, setUserState } = useContext(UserContext)
  const { language, adultContentFilter, openInNewTab } = userState

  const methods = useForm<InputsProp>({
    defaultValues: {
      language,
      adultContentFilter,
      openInNewTab,
    },
  })
  const { handleSubmit, register } = methods

  function onSubmit({ language, adultContentFilter, openInNewTab }) {
    setUserState({
      language,
      adultContentFilter,
      openInNewTab,
    })

    callbackCloseSettings()
  }

  return (
    <>
      <div className={styles.settingsHeader}>
        <h4 className='title'>Settings</h4>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.settingsBody}>
            <div className={styles.controlBox}>
              <label htmlFor='language'>Language</label>
              <Select
                id='language'
                name='language'
                options={[
                  { label: 'English', value: 1 },
                  // { label: 'Italian, value: 2 },
                ]}
                register={register}
              />
            </div>

            <div className={styles.controlBox}>
              <label htmlFor='adultContentFilter'>Adult filter</label>
              <Select
                id='adultContentFilter'
                name='adultContentFilter'
                options={[
                  { label: 'Off', value: 0 },
                  { label: 'Moderate', value: 1 },
                  { label: 'Strict', value: 2 },
                ]}
                register={register}
              />
            </div>

            <div className={styles.controlBox}>
              <Input
                id='openInNewTab'
                name='openInNewTab'
                className={styles.checkbox}
                type='checkbox'
                register={register}
              />
              <label className={styles.checkboxLabel} htmlFor='openInNewTab'>
                New tab
              </label>
            </div>
          </div>
          <div className={styles.settingsFooter}>
            <TextButton onClick={() => callbackCloseSettings()}>Close</TextButton>
            <ButtonPrimary>
              <button type='submit'>Save'</button>
            </ButtonPrimary>
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default SettingsForm
