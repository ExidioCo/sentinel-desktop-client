import * as React from "react";

const Sentinel = (props) => {
  return (
    <svg width="auto" height="auto" viewBox="0 0 205 35" fill="none" {...props}>
      <path
        d="M21.3804 24.9379C21.3804 27.8137 20.3351 30.0562 18.2444 31.6655C16.1538 33.2747 13.3165 34.0793 9.73256 34.0793C5.84996 34.0793 2.86334 33.5802 0.772705 32.5818V28.9163C2.11668 29.4825 3.58013 29.9296 5.16303 30.2574C6.74594 30.5852 8.31392 30.7491 9.86696 30.7491C12.4056 30.7491 14.317 30.2723 15.6013 29.3186C16.8855 28.3501 17.5276 27.0091 17.5276 25.2955C17.5276 24.1631 17.2962 23.2393 16.8332 22.524C16.3853 21.7939 15.6237 21.1234 14.5485 20.5125C13.4882 19.9016 11.868 19.2087 9.68776 18.4339C6.64141 17.3462 4.46118 16.0573 3.14707 14.5672C1.84789 13.0772 1.1983 11.1327 1.1983 8.73371C1.1983 6.21554 2.14655 4.21143 4.04305 2.72139C5.93956 1.23135 8.44832 0.486328 11.5693 0.486328C14.8247 0.486328 17.8188 1.08234 20.5516 2.27438L19.3644 5.58227C16.6615 4.44984 14.0333 3.88362 11.4797 3.88362C9.46377 3.88362 7.88832 4.31574 6.75341 5.17996C5.61849 6.04418 5.05104 7.24367 5.05104 8.77841C5.05104 9.91084 5.2601 10.8421 5.67823 11.5722C6.09635 12.2875 6.79821 12.9505 7.78379 13.5614C8.78431 14.1575 10.3075 14.8205 12.3533 15.5507C15.7879 16.7725 18.1474 18.0837 19.4316 19.4844C20.7308 20.885 21.3804 22.7029 21.3804 24.9379Z"
        fill="#F6F8FB"
      />
      <path
        d="M46.3336 33.6323H28.0779V0.955691H46.3336V4.33064H31.8858V14.8578H45.46V18.2104H31.8858V30.235H46.3336V33.6323Z"
        fill="#F6F8FB"
      />
      <path
        d="M79.1939 33.6323H74.8483L56.951 6.20809H56.7718C57.0107 9.42658 57.1302 12.3769 57.1302 15.0589V33.6323H53.6135V0.955691H57.9142L75.7667 28.2682H75.9459C75.916 27.8658 75.8488 26.577 75.7443 24.4015C75.6398 22.2111 75.6024 20.6466 75.6323 19.7079V0.955691H79.1939V33.6323Z"
        fill="#F6F8FB"
      />
      <path
        d="M98.2784 33.6323H94.4704V4.33064H84.0994V0.955691H108.649V4.33064H98.2784V33.6323Z"
        fill="#F6F8FB"
      />
      <path d="M113.6 33.6323V0.955691H117.408V33.6323H113.6Z" fill="#F6F8FB" />
      <path
        d="M151.993 33.6323H147.647L129.75 6.20809H129.571C129.81 9.42658 129.929 12.3769 129.929 15.0589V33.6323H126.412V0.955691H130.713L148.566 28.2682H148.745C148.715 27.8658 148.648 26.577 148.543 24.4015C148.439 22.2111 148.401 20.6466 148.431 19.7079V0.955691H151.993V33.6323Z"
        fill="#F6F8FB"
      />
      <path
        d="M179.253 33.6323H160.997V0.955691H179.253V4.33064H164.805V14.8578H178.379V18.2104H164.805V30.235H179.253V33.6323Z"
        fill="#F6F8FB"
      />
      <path
        d="M186.533 33.6323V0.955691H190.341V30.1903H204.789V33.6323H186.533Z"
        fill="#F6F8FB"
      />
    </svg>
  );
};

const MemoSentinel = React.memo(Sentinel);
export default MemoSentinel;