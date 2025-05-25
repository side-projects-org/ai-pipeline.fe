import styled from "styled-components";
import {useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handlePlaygroundClick = () => {
        navigate('/prompt/playground');
    }

    const handlePromptListClick = () => {
        navigate('/prompt');
    }


    return (
        <HeaderContainer>
            <TextLogo>Pipe AI</TextLogo>
            <NavContainer>
                <PlayGroundNav onClick={handlePlaygroundClick}>플레이그라운드</PlayGroundNav>
                <PromptListNav onClick={handlePromptListClick}>프롬프트 목록</PromptListNav>
            </NavContainer>
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

const NavContainer = styled.div`
    display: flex;
    gap: 1rem;
`;


const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    color: #282c34;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const PlayGroundNav = styled(Nav)`
`;

const PromptListNav = styled(Nav)`
`;
export default Header;