import * as React from "react";

function Close(props) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 12 11" fill="none" {...props}>
      <path
        d="M0.437574 0.0036715C0.348955 0.0131721 0.264861 0.0476585 0.195087 0.103113C0.125314 0.158567 0.0727349 0.232706 0.043475 0.316892C0.0142151 0.401078 0.00947938 0.491846 0.0298196 0.57862C0.0501599 0.665394 0.0947386 0.744603 0.158362 0.807017L4.84128 5.49483L0.158362 10.1777C0.110249 10.2204 0.0713892 10.2724 0.0441837 10.3307C0.0169782 10.3889 0.0020046 10.4521 0.000187831 10.5164C-0.00162894 10.5807 0.00974977 10.6446 0.033621 10.7043C0.0574922 10.764 0.0933489 10.8182 0.138976 10.8635C0.184604 10.9088 0.239033 10.9442 0.298902 10.9677C0.358771 10.9911 0.422807 11.002 0.487057 10.9997C0.551306 10.9974 0.614404 10.982 0.672452 10.9543C0.7305 10.9267 0.782265 10.8875 0.824551 10.839L5.50746 6.15612L10.1904 10.839C10.2327 10.8875 10.2844 10.9267 10.3425 10.9543C10.4005 10.982 10.4636 10.9974 10.5279 10.9997C10.5921 11.002 10.6562 10.9911 10.716 10.9677C10.7759 10.9442 10.8303 10.9088 10.876 10.8635C10.9216 10.8182 10.9574 10.764 10.9813 10.7043C11.0052 10.6446 11.0166 10.5807 11.0147 10.5164C11.0129 10.4521 10.998 10.3889 10.9707 10.3307C10.9435 10.2724 10.9047 10.2204 10.8566 10.1777L6.17365 5.49483L10.8566 0.807017C10.9271 0.738225 10.9743 0.649012 10.9914 0.551973C11.0085 0.454934 10.9947 0.354972 10.9519 0.266198C10.9092 0.177425 10.8396 0.104325 10.7531 0.05722C10.6665 0.0101149 10.5674 -0.00861612 10.4696 0.0036715C10.363 0.0177232 10.2645 0.0678577 10.1904 0.145726L5.50746 4.82864L0.824551 0.145726C0.77507 0.0942169 0.714506 0.0546545 0.647456 0.030041C0.580405 0.0054275 0.508629 -0.0035904 0.437574 0.0036715Z"
        fill="#55678B"
      />
    </svg>
  );
}

const MemoClose = React.memo(Close);
export default MemoClose;
