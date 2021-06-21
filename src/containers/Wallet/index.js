import './index.css';
import { COIN_DISPLAY_DENOM } from '../../constants/common';
import { Tab, Tabs } from 'react-bootstrap';
import Balance from './Balance';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Label from '../../components/Label';
import Logo from '../../assets/Logo.svg';
import ModalTxInfo from '../common/ModalTxInfo';
import React from 'react';
import Receive from './Receive';
import Refresh from './Refresh';
import SendAmount from './Send/Amount';
import SendModal from './Send/Modal';
import SendSend from './Send/Send';
import SendTo from './Send/To';
import TextBox from '../../components/TextBox';
import Validators from './Validators';
import ValidatorsModalDelegate from './Validators/ModalDelegate';
import ValidatorsModalRedelegate from './Validators/ModalRedelegate';
import ValidatorsModalUnbond from './Validators/ModalUnbond';
import ValidatorsStatus from './Validators/Status';
import WithdrawRewardsModal from './WithdrawRewards/Modal';
import WithdrawRewardsValidators from './WithdrawRewards/Validators';
import WithdrawRewardsWithDraw from './WithdrawRewards/Withdraw';

const Wallet = () => {
    return (
        <>
            <SendModal/>
            <ValidatorsModalDelegate/>
            <ValidatorsModalRedelegate/>
            <ValidatorsModalUnbond/>
            <WithdrawRewardsModal/>
            <ModalTxInfo/>
            <div className="top-info-section">
                <div className="logo-info-section col-md-4">
                    <div className="top-section">
                        <TextBox
                            className="sentinel-text"
                            value="Tokens"
                        />
                        <div className="logo-box">
                            <div className="left">
                                <div className="logo">
                                    <Image
                                        alt="Logo"
                                        className=""
                                        src={Logo}
                                    />
                                </div>
                                <TextBox
                                    className="sentinel-text"
                                    value="Sentinel"
                                />
                                <TextBox
                                    className="sub-text"
                                    value={`(${COIN_DISPLAY_DENOM})`}
                                />
                            </div>
                            <Icon
                                className="icon"
                                icon="success"
                            />
                        </div>
                    </div>
                </div>
                <div className="token-info-section col-md-8">
                    <Balance/>
                    <Refresh/>
                </div>
            </div>
            <div className="wallet-details">
                <div className="middle-section col-md-4">
                    <div className="flex-tabs">
                        <div className="tabs-section">
                            <Tabs
                                defaultActiveKey="receive"
                                transition={false}>
                                <Tab
                                    eventKey="receive"
                                    tabClassName="receive-tab"
                                    title="Receive">
                                    <Receive/>
                                </Tab>
                                <Tab
                                    eventKey="send"
                                    title="Send">
                                    <div className="form-group">
                                        <Label
                                            className="label"
                                            label="To Address"
                                        />
                                        <SendTo/>
                                    </div>
                                    <div className="form-group">
                                        <Label
                                            className="label"
                                            label="amount"
                                        />
                                        <SendAmount/>
                                    </div>
                                    <SendSend/>
                                </Tab>
                            </Tabs>
                        </div>
                        <div className="withdraw-section">
                            <TextBox
                                className="title"
                                value="Withdraw Rewards"
                            />
                            <div className="withdraw-section-content">
                                <div className="form-group">
                                    <Label
                                        className="label"
                                        label="Select a Validator"
                                    />
                                    <WithdrawRewardsValidators/>
                                </div>
                                <WithdrawRewardsWithDraw/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wallet-tab col-md-8">
                    <div className="filter-section">
                        <ValidatorsStatus/>
                    </div>
                    <Tabs
                        defaultActiveKey="validators"
                        transition={false}>
                        <Tab
                            eventKey="validators"
                            title="Validators">
                            <Validators/>
                        </Tab>
                        {/* <Tab eventKey="Proposals" title="Proposals"> */}
                        {/*    <Proposals/> */}
                        {/* </Tab> */}
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Wallet;
