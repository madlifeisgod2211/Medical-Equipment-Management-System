import React, { useContext, useEffect } from 'react';
import { ParameterContext } from '../../../contexts/ParameterContext';
import style from './DisplayParameters.module.css';
import tempIcon from '../../../assets/temperature.png';
import humidityIcon from '../../../assets/humidity.png';

const DisplayParametes = () => {
  const { parameterState: parameters, getParameters } =
    useContext(ParameterContext);

  useEffect(() => getParameters(), []);
  //   console.log(parameterState);

  return (
    <>
      <div className={style.sub}>
        <strong>
          Độ ẩm trong túi <img src={humidityIcon} className={style.icon} /> :
          <span style={{ color: 'green' }}>11%</span>{' '}
        </strong>
        <div className={style.sub}>
          <strong>
            Nhiệt độ trong túi <img src={tempIcon} className={style.icon} />:
            <span style={{ color: 'green' }}>34.31 oC</span>
          </strong>
        </div>
      </div>
    </>
  );
};

export default DisplayParametes;
