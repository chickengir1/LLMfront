import React from 'react';
import './Home.css';
import mainImg from "../../assets/dico.webp"
const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="1" d="M0,128L13.3,133.3C26.7,139,53,149,80,144C106.7,139,133,117,160,106.7C186.7,96,213,96,240,122.7C266.7,149,293,203,320,197.3C346.7,192,373,128,400,117.3C426.7,107,453,149,480,154.7C506.7,160,533,128,560,106.7C586.7,85,613,75,640,80C666.7,85,693,107,720,149.3C746.7,192,773,256,800,266.7C826.7,277,853,235,880,186.7C906.7,139,933,85,960,53.3C986.7,21,1013,11,1040,48C1066.7,85,1093,171,1120,181.3C1146.7,192,1173,128,1200,90.7C1226.7,53,1253,43,1280,74.7C1306.7,107,1333,181,1360,208C1386.7,235,1413,213,1427,202.7L1440,192L1440,320L1426.7,320C1413.3,320,1387,320,1360,320C1333.3,320,1307,320,1280,320C1253.3,320,1227,320,1200,320C1173.3,320,1147,320,1120,320C1093.3,320,1067,320,1040,320C1013.3,320,987,320,960,320C933.3,320,907,320,880,320C853.3,320,827,320,800,320C773.3,320,747,320,720,320C693.3,320,667,320,640,320C613.3,320,587,320,560,320C533.3,320,507,320,480,320C453.3,320,427,320,400,320C373.3,320,347,320,320,320C293.3,320,267,320,240,320C213.3,320,187,320,160,320C133.3,320,107,320,80,320C53.3,320,27,320,13,320L0,320Z"></path></svg>`;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const Scroll = (e) => {
  e.preventDefault();
  const featuresSection = document.querySelector('.features');
  featuresSection.scrollIntoView({ behavior: 'smooth' });
}



const Home = () => {
  return (
    <div className='homesection'>
    <div className="home">
      <div className="content">
        <div className="text">
        <h1 className="h1">소개글</h1>
        <h2 className='h2'>핵심요약핵심요약핵심요약핵심요약</h2>
        <p className="p">여기에는 소개글이 들어갑니다여기에는 소개글이 들어갑니다여기에는 소개글이 들어갑니다여기에는 소개글이 들어갑니다.</p>
        </div>
        <div className="banner">
          <img className='img' src={mainImg} alt="이미지 설명" />
        </div>
      </div>
    </div>
    <span className='downScroll'><a href="#scrollTarget" onClick={Scroll} className='downScroll'>
  <FontAwesomeIcon className='downScroll' icon={faChevronDown} />
</a></span>
    <div className='Animation' dangerouslySetInnerHTML={{ __html: svgCode }}></div>
    </div>
  );
}

export default Home;
