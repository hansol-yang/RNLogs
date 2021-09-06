import React, { useContext } from 'react';
import { Modal, StyleSheet } from 'react-native';
import styled, { css } from 'styled-components/native';
import Picture from '../../common/Picture';
import DatePickerContext from './date-picker.context';

/* Constants =========================================================== */
const WIDTH = 300;
const MONTH = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
/* Prop =========================================================== */
type Prop = {
    visible: boolean;
    onRequestClose: () => void;
};
/* <MonthPickerModal/> =========================================================== */
const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const Dimmer = styled.TouchableOpacity`
    background-color: #00000080;
`;
const ContentWrapper = styled.View`
    background-color: #fff;
`;
const Header = styled.View`
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    border-bottom-color: #d9d9d9;
    border-bottom-width: 1px;
    flex-direction: row;
`;
const Year = styled.Text`
    font-weight: bold;
    font-size: 18px;
`;
const MonthWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    width: ${WIDTH + 2}px;
    height: ${WIDTH + 100 + 3}px;
    background-color: #d9d9d9;
`;
type MonthButtonProp = { needVerticalGap: boolean; needHorizontalGap: boolean };
const MonthButton = styled.TouchableOpacity<MonthButtonProp>`
    width: ${WIDTH / 3}px;
    height: ${WIDTH / 3}px;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    margin-right: ${prop => (prop.needVerticalGap ? '1px' : 0)};
    margin-bottom: ${prop => (prop.needHorizontalGap ? '1px' : 0)};
`;
const Month = styled.Text``;
const YearButton = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    border-radius: 15px;
`;
const arrowCommonIconStyle = css`
    width: 100%;
    height: 100%;
`;

export default function MonthPickerModal(prop: Prop) {
    const { visible, onRequestClose } = prop;

    const { date, setDate } = useContext(DatePickerContext);
    const { year } = date;

    const renderMonthItem = (item: number) => {
        const needVerticalGap = item % 3 === 1 || item % 3 === 2;
        const needHorizontalGap = item % 3 === 1;
        const _onPressMonthItem = () => {
            setDate({ year, month: item, needToScroll: true });
            onRequestClose();
        };
        return (
            <MonthButton
                key={item}
                needVerticalGap={needVerticalGap}
                needHorizontalGap={needHorizontalGap}
                onPress={_onPressMonthItem}>
                <Month>{item}월</Month>
            </MonthButton>
        );
    };

    const _onPressYear = (left: boolean) => {
        let next = left ? year - 1 : year + 1;
        setDate({ year: next, month: 1, needToScroll: false });
    };

    return (
        <Modal visible={visible} transparent onRequestClose={onRequestClose}>
            <Wrapper>
                <Dimmer
                    style={StyleSheet.absoluteFill}
                    onPress={onRequestClose}
                />
                <ContentWrapper>
                    <Header>
                        <YearButton onPress={() => _onPressYear(true)}>
                            <Picture
                                source={require('./img/ico-arrow-down.png')}
                                style={arrowCommonIconStyle}
                                rnStyle={styles.leftIcon}
                            />
                        </YearButton>
                        <Year>{year}년</Year>
                        <YearButton onPress={() => _onPressYear(false)}>
                            <Picture
                                source={require('./img/ico-arrow-down.png')}
                                style={arrowCommonIconStyle}
                                rnStyle={styles.rightIcon}
                            />
                        </YearButton>
                    </Header>
                    <MonthWrapper>{MONTH.map(renderMonthItem)}</MonthWrapper>
                </ContentWrapper>
            </Wrapper>
        </Modal>
    );
}
MonthPickerModal.defaultProps = { visible: false };
const styles = StyleSheet.create({
    leftIcon: {
        transform: [{ rotateZ: '90deg' }],
    },
    rightIcon: {
        transform: [{ rotateZ: '-90deg' }],
    },
});
