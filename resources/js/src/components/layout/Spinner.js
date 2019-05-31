import React from "react";
import { CircleLoader } from "react-spinners";
import { css } from "@emotion/core";

export default function Spinner(props) {
  const color = props.color ? props.color : "#ffffff";
  const style = css`
    display: block;
    margin: 4rem auto 0;
    border-color: red;
  `;
  return (
    <CircleLoader
      css={style}
      sizeUnit={"rem"}
      size={7}
      color={color}
      loading={true}
    />
  );
}
