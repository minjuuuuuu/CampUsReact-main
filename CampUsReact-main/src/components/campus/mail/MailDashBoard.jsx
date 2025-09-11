import React from 'react'
import styled from 'styled-components'
import {Content, ContentBox, Contents, Header, HeadText, IconBox, LecText } from '../home/HomeWrapper'
import { Flex, GrayHr } from '../home/HomeWrapperPro'
import { Hr } from '../menu/SideMenu'
import { unRead, read, go, Cancle } from '../img'
import { useMailModalStore } from '../commons/modalStore'
import { Button, MailDashBox, RegistButton } from '../commons/WHComponent'
import { Container } from '../topNav/TopNav'
import MailNavBar from './MailNavBar'

const MainContainer = styled.div`
    width: 412px;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0 auto;
    background-color: #f7f7f7;
    min-height: calc(100vh - 119px);
    position: fixed;
    z-index: 999; 
`

const MiniIconBox = styled.div`
    width: 22px;
    height: 17px;
    line-height: 20px;
`
const Post = styled.div`
    position: absolute;
    width: 84px;
    height: 84px;
    border-radius: 80px;
    background-color: #2ec4b6;
    bottom: 87px;
    right: 26px;
    display: flex;               
    justify-content: center;      
    align-items: center; 
`
function MailDashBoard() {
    const visible = useMailModalStore((state) => state.visible);
    const hideModal = useMailModalStore((state) => state.hideModal);

    if (!visible) return null;
  return (
    <>        
     <MainContainer style={{height:'100%'}}>
        <Container style={{backgroundColor:'#fff',display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <img src={Cancle} style={{width:'19px', height:'19px', cursor:'pointer'}} onClick={hideModal}></img>
            <Button style={{width:'65px'}}>메일 작성</Button>
        </Container>
        <GrayHr style={{margin:0, backgroundColor:'#ddd'}}/>
        <MailNavBar/>

      <MailDashBox style={{marginTop:'13px', height:'308px'}}>
        <Header>
            <HeadText>
                받은 메일함
            </HeadText>
            <IconBox>
                <img src={go} style={{width:"100%", height: "100%", objectFit:"cover"}}/>
            </IconBox>
        </Header>
        <Hr style={{margin:'0 auto', width:'344px'}}></Hr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <MiniIconBox>
                <img src={unRead} style={{width:"100%", height: "100%", objectFit:"cover"}}/>
            </MiniIconBox>
            <div style={{marginLeft:'12px'}}>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{marginLeft:'34px', marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <MiniIconBox>
                <img src={unRead} style={{width:"100%", height: "100%", objectFit:"cover"}}/>
            </MiniIconBox>
            <div style={{marginLeft:'12px'}}>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{marginLeft:'34px', marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <MiniIconBox>
                <img src={unRead} style={{width:"100%", height: "100%", objectFit:"cover"}}/>
            </MiniIconBox>
            <div style={{marginLeft:'12px'}}>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{marginLeft:'34px', marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <MiniIconBox>
                <img src={unRead} style={{width:"100%", height: "100%", objectFit:"cover"}}/>
            </MiniIconBox>
            <div style={{marginLeft:'12px'}}>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{marginLeft:'34px', marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
      </MailDashBox>
      
      <MailDashBox style={{marginTop:'13px', height:'308px'}}>
        <Header>
            <HeadText>
                보낸 메일함
            </HeadText>
            <IconBox>
                <img src={go} style={{width:"100%", height: "100%", objectFit:"cover"}}/>
            </IconBox>
        </Header>
        <Hr style={{margin:'0 auto', width:'344px'}}></Hr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <div>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{ marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <div>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <div>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
        <Contents style={{paddingTop:'13px'}}>
            <Content>
            <div>
            <LecText>김나연</LecText></div>
            <div style={{marginLeft:'10px'}}>
            <LecText style={{fontSize:'12px', color:'#aaa'}}>20220022</LecText>
            </div>
            <div style={{marginLeft:'auto'}}>
                <LecText style={{fontSize:'12px', color:'#aaa'}}>25-08-21</LecText>
            </div>
            </Content>
            <div style={{ marginTop:'10px'}}>
            <LecText style={{marginBottom:'10px'}}>과제 질문 있습니다~</LecText>
            </div>
        </Contents>
        <GrayHr style={{margin:'0 auto', width:'344px'}}></GrayHr>
      </MailDashBox>
        <Post>
            <img src={go} style={{width:"70%", height: "70%", objectFit:'contain'}}/>
        </Post>
    </MainContainer>
    </>

  )
}

export default MailDashBoard