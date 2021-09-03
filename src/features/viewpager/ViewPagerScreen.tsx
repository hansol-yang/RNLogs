import React from 'react';
import styled, { css } from 'styled-components/native';
import Container from '../../common/Container';
import ViewPager from './ViewPager';

/* Constants =========================================================== */
/* Prop =========================================================== */
type Prop = {};
/* <ViewPagerScreen/> =========================================================== */
const Page = styled.View`
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;
const Title = styled.Text``;
export default function ViewPagerScreen() {
    const renderPage = (item: number, idx: number) => (
        <Page key={idx}>
            <Title>{item}</Title>
        </Page>
    );
    return (
        <Container
            css={css`
                align-items: center;
            `}>
            <ViewPager onChangePage={console.log}>
                {[...Array(5).keys()].map(renderPage)}
            </ViewPager>
        </Container>
    );
}
ViewPagerScreen.defaultProps = {};
