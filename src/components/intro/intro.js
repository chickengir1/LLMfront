import React from "react";
import "./intro.css";
import bg from "../../assets/dico - 복사본 (13).webp";
import { Link } from "react-scroll";
import btnimg from "../../assets/dico - 복사본 (14).webp";

const Intro = () => {
  return (
    <section id="intro">
      <div className="introContent">
        <span className="hello">반갑노</span>
        <span className="introtext">
          디스코드{" "}
          <span className="introname">
            챗봇 <br />
          </span>
        </span>
        <p className="intropara">
          아직 적을 내용 생각 못함
          <br /> 아직 적을 내용 생각 못함
        </p>
        <Link>
          <button className="btn">
            <img src={btnimg} alt="" className="btnimg" />
            Click here
          </button>
        </Link>
      </div>
      <img src={bg} alt="profile" className="bg" />
    </section>
  );
};

export default Intro;
