import React from 'react';
import { FaDollarSign, FaExpandAlt, FaHashtag, FaPercentage } from 'react-icons/fa';

import imgInfo from '../../assets/Information.png';

function ButtonGraphGroup({
    button1Title='Amount',
    button2Title="Financial Value",
    button4Title="Percentage",
    button2Content=<FaDollarSign />,
    inState=true,
    button1OnClick=()=>{},
    button2OnClick=()=>{},
    button5OnClick=()=>{},
    expandButtonOnClick=()=>{},
    button1Hide=false,
    button2Hide=false,
    button3Hide=true,
    button4Hide=false,
    button5Hide=true,
    button3Title='',
}){

    let darkColor = '#424242';
    let lightColor = '#FAFAFA';

    // console.log("antes:"+inState, button4Hide);
    let opts = [
        "#",'$',"%"
    ];
    inState = (inState === true || inState === false) ? (inState ? '$':'#') : opts.includes(inState) ? inState:'#';
    // console.log("depois:"+inState, button4Hide);
    return <>
    {
        !button1Hide &&
        <button
        title={button1Title}
        className={"btn btn-sm "+('btn-light')}
        style={{
            color: inState != '#' ? darkColor : lightColor,
            background: inState == '#' ? darkColor : lightColor,
        }}
        onClick={button1OnClick}
        >
        <FaHashtag />
    </button>
    }
    
    {
        !button2Hide &&
        <button
            title={button2Title}
            className={"btn btn-sm "+('btn-light')}
            style={{
                color: inState != '$' ? darkColor : lightColor,
                background: inState == '$' ? darkColor : lightColor,
            }}
            onClick={button2OnClick}
            >
            {button2Content}
        </button>
    }

    {
        !button5Hide &&
        <button
            title={button4Title}
            className={"btn btn-sm "+('btn-light')}
            style={{
                color: inState != '%' ? darkColor : lightColor,
                background: inState == '%' ? darkColor : lightColor,
            }}
            onClick={button5OnClick}
            >
            <FaPercentage />
        </button>
    }

    {
        !button3Hide && 
        <button
            title={button3Title}
            className={"btn btn-sm "+('')}
            style={{
                color: darkColor,
                background: 'transparent',
            }}
            >
            <img src={imgInfo} style={{width:20}}  />
        </button>
    }

    {
        !button4Hide &&
        <button
            title={'Expandir'}
            className={"btn btn-sm "+('')}
            style={{
                color: darkColor,
                background: 'transparent',
            }}
            onClick={expandButtonOnClick}
            >
            <FaExpandAlt />
        </button>
    }

    </>;
}

export default ButtonGraphGroup;