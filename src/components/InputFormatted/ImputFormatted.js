import { Input } from 'antd'
import React, { useEffect, useState } from 'react'

import { TimePicker } from 'antd';

const ImputFormatted = ({ form, placeholder }) => {
  console.log(form);
  const format = 'HH:mm';

  function onChange(time, timeString) {
    console.log(time, timeString);
  }

  return (
    <TimePicker.RangePicker
      placeholder={['Inicio', ['Fin']]}
      onChange={onChange}
      format={format}
    />
  )
}

export default ImputFormatted
