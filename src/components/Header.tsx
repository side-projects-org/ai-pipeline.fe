import styled from "styled-components";

const Header: React.FC = () => {
    return (
        <HeaderContainer>
            <TextLogo>Pipe AI</TextLogo>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 60px;
`;

const TextLogo = styled.h1`
    font-weight: 800;
    color: #282c34;
    border-bottom: 5px solid #282c34;
`;
export default Header;