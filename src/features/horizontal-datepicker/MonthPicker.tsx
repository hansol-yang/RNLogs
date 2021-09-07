import React, { useContext, useState } from 'react';
import styled, { css } from 'styled-components/native';
import Picture from '../../common/Picture';
import DatePickerContext from './date-picker.context';
import MonthPickerModal from './MonthPickerModal';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <MonthPicker/> =========================================================== */
const Wrapper = styled.TouchableOpacity`
    background-color: #fff;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 7px 15px;
    border-radius: 20px;
`;
const YearMonth = styled.Text``;
const iconStyle = css`
    width: 20px;
    height: 20px;
`;
export default function MonthPicker() {
    const [showModal, setShowModal] = useState(false);

    const { date } = useContext(DatePickerContext);

    const _onPress = () => setShowModal(true);

    const _onRequestCloseModal = () => setShowModal(false);

    return (
        <>
            <Wrapper onPress={_onPress}>
                <YearMonth>
                    {date.year}년 {date.month}월
                </YearMonth>
                <Picture
                    source={require('./img/ico-arrow-down.png')}
                    style={iconStyle}
                />
            </Wrapper>
            <MonthPickerModal
                visible={showModal}
                onRequestClose={_onRequestCloseModal}
            />
        </>
    );
}
MonthPicker.defaultProps = {};
