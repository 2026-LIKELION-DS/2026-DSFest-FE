import styled from "styled-components";

export const Container = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavWrapper = styled.div`
  position: sticky;
  bottom: 0;
  z-index: 100;
`;

export const Main = styled.main<{ $showNavBar: boolean }>`
  flex: 1;
  overflow-y: auto;
`;
