import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios'
import { stripHtml } from '../utils/stripHTML';
import Card from '../components/Card';

const Wrapper = styled.div`
  width: 100%;
  padding: 0 14px;
  position: relative;
`

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Title = styled.span`
  display: block;
  text-align: left;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.black};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  margin-bottom: 12px;
`
const News = () => {
  const [items, setItems] = useState([]);
  const [start, setStart] = useState(1); // naver api 파라미터: 검색 시작 위치(기본값: 1, 최댓값: 1000)
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = (start) => {
    if (start !== 1) {
      setIsLoading(true);
    }
    axios({
      url: '/v1/search/news.json', // 네이버 news 검색 api url
      headers: {
        'X-Naver-Client-Id': 'n1J7STnVyixMG0XvvkCY',
        'X-Naver-Client-Secret': '1EtE_nq2rK',
      },
      method: 'get', // 통신 방식
      params: {
        query: '케이팝', // 검색어
        start: start // 
      }
    })
    .then(res => {
      start === 1 
      ? setItems(res.data.items) 
      : setItems((prevItems)=>[...prevItems, ...res.data.items])
      // console.log(res.data.items)
    })
    .catch(err => {
      console.log(err)
    })
    .finally(()=>{
      if (start !== 1) {
        setIsLoading(false);
      }
    })
  }

  useEffect(()=>{
    fetchItems(start)
  },[start])

    /*
  handleObserver: 교차점이 발생했을 때 실행되는 콜백 함수.
  entries: 교차점 정보를 담는 배열
  isIntersecting: 교차점(intersection)이 발생한 요소의 상태
  교차점이 발생하면 start 10 증가
  */
  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) { 
      setStart((prevStart) => prevStart + 10)
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0, //  Intersection Observer의 옵션, 0일 때는 교차점이 한 번만 발생해도 실행
    });
    // id가 observer인 요소를 타겟으로 지정
    const target = document.getElementById("observer");
    // 관찰 시작
    if (target) {
      observer.observe(target);
    }
    return () => {
      if(target) {
        observer.unobserve(target);
      }
    }
  }, []);


  return (
    <Wrapper>
      <Title>Kpop 뉴스</Title>
      <CardList>
        {items &&
          items.map((item)=>{
            const title = stripHtml(item.title);
            const content = stripHtml(item.description);
            const link = item.link
            return (
              <Card
                title={title}
                content={content}
                link={link}/>
            )
          })
        }
        {isLoading && <div>Loading...</div>}
        <div id="observer" style={{ height: "10px" }}></div>
      </CardList>
    </Wrapper>
  )
}

export default News
