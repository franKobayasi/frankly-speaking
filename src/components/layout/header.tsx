import styled from "styled-components"
import Link from 'next/link'

const navConfig = [
    {
        title: "Blog",
        pathName: "blog"
    },
    {
        title: "PortFolio",
        pathName: "portfolio"
    },
    {
        title: "Home",
        pathName: "/"
    }
]


export default function Header () {
    return <Wrapper className="box-100vw">
        <Logo/>
        <Nav>
            {
                navConfig.map(nav=>
                <Link href={nav.pathName}>
                    <NavItem >{nav.title}</NavItem>
                </Link>)
            }
        </Nav>
    </Wrapper>
}

const Wrapper = styled.div`
    background-color: #eee;
    height: 75px;
    position: relative;
    overflow: hidden;
`

const Logo = styled.div`
    float: left;
    margin-left: 2.5vw;
    width: 125px;
    height: 75px;
    border: none;
    background-image: url("/images/website_logo_frank_signature.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`

const Nav = styled.div`
    margin-right: 2.5vw;
    display: flex;
    float: right;
    flex-direction: row-reverse;
    flex-wrap: nowrap;
    justify-content: space-between;
    height: 75px;
    border: none;
    overflow-y: hidden;
`

const NavItem = styled.div`
    height: 100%;
    border: none;
    color: #000;
    font-size: 14px;
    padding: 0 20px;
    line-height: 75px;
    &:hover {
        color: #555
    }
    cursor: pointer;
`