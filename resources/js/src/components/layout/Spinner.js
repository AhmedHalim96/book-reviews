import React from 'react'
import { CircleLoader } from 'react-spinners';
import { css } from '@emotion/core';


const override = css`
    display: block;
    margin: 4rem auto 0;
    border-color: red;
`;
export default function Spinner() {
  return (
    <CircleLoader
    css={override}
    sizeUnit={"rem"}
    size={7}
    color={'#ffffff'}
    loading={true}
    />
  )
}
